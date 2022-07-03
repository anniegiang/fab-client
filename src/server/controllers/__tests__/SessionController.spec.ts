import {SessionControllerInstance} from "server/controllers/SessionController";
import {rest} from "msw";
import {setupServer} from "msw/node";
import setupServerActions from "mocks/setupServerActions";
import {mockAuthHeaders, DEFAULT_BASE_API} from "mocks/authHeadersFactory";
import {mockUserInfoResponse} from "mocks/userFactory";
import {mockSessionResponse} from "mocks/sessionFactory";

const authHeaders = mockAuthHeaders();
const {userid} = authHeaders;

const userInfoResponse = mockUserInfoResponse();
const sessionSuccessResponse = mockSessionResponse();
const sessionFailResponse = mockSessionResponse({
  isAuthenticated: false,
  isError: true
});

const mockLoginSuccess = rest.get(
  `${DEFAULT_BASE_API}/users/${userid}/info`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(userInfoResponse));
  }
);

const server = setupServer(mockLoginSuccess);

setupServerActions(server);

describe("SessionContoller", () => {
  test("login (success)", async () => {
    const response = await SessionControllerInstance.login(
      authHeaders.userid,
      authHeaders.accesstoken
    );
    expect(response).toEqual(sessionSuccessResponse);
  });

  test("login (fail)", async () => {
    const spy = jest.spyOn(console, "warn");
    server.use(
      rest.get(`${DEFAULT_BASE_API}/users/${userid}/info`, (_, res, ctx) =>
        res(ctx.status(400), ctx.json({error: "no"}))
      )
    );

    const response = await SessionControllerInstance.login(
      authHeaders.userid,
      authHeaders.accesstoken
    );

    expect(response).toEqual(sessionFailResponse);
    expect(spy).toHaveBeenNthCalledWith(1, "[warn]: Error logging in");
    spy.mockRestore();
  });
});
