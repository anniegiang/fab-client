import GroupController from "server/controllers/GroupController";
import {rest} from "msw";
import {setupServer} from "msw/node";
import setupServerActions from "mocks/setupServerActions";
import {mockGroup, mockGroupResponse} from "mocks/groupFactory";
import {mockGroupMessagseResponse} from "mocks/messageFactory";
import {mockAuthHeaders, DEFAULT_BASE_API} from "mocks/authHeadersFactory";

const authHeaders = mockAuthHeaders();
const group = mockGroup();
const groupReponse = mockGroupResponse({group});
const groupMessageReponse = mockGroupMessagseResponse();

const mockGetGroupInfo = rest.get(
  `${DEFAULT_BASE_API}/groups/${group.id}`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(groupReponse));
  }
);

const mockGetGroupMessages = rest.get(
  `${DEFAULT_BASE_API}/groups/${group.id}/messages`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(groupMessageReponse));
  }
);

const server = setupServer(mockGetGroupInfo, mockGetGroupMessages);

setupServerActions(server);

describe("GroupController", () => {
  test("getGroupInfo", async () => {
    const response = await GroupController.getGroupInfo(group.id, authHeaders);
    expect(response).toEqual(groupReponse);
  });

  test("getGroupMessages", async () => {
    const response = await GroupController.getGroupMessages(
      group.id,
      authHeaders
    );
    expect(response).toEqual(groupMessageReponse);
  });
});
