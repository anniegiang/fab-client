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
const sessionInvalidResponse = mockSessionResponse({
  isAuthenticated: false,
  isError: false
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
        res(ctx.status(500))
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

  test("login (success & invalid credentials)", async () => {
    const spy = jest.spyOn(console, "warn");
    server.use(
      rest.get(`${DEFAULT_BASE_API}/users/${userid}/info`, (_, res, ctx) =>
        res(ctx.status(201), ctx.json({error: "invalid credentials"}))
      )
    );

    const response = await SessionControllerInstance.login(
      authHeaders.userid,
      authHeaders.accesstoken
    );

    expect(response).toEqual(sessionInvalidResponse);
    expect(spy).toHaveBeenNthCalledWith(1, "[warn]: Invalid credentials");
    spy.mockRestore();
  });
});
