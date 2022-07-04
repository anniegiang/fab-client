import {rest} from "msw";
import {setupServer} from "msw/node";
import setupServerActions from "mocks/setupServerActions";
import UserController from "server/controllers/UserController";
import {mockArtistResponse, mockArtist} from "mocks/artistFactory";
import {mockSubscribedGroupsResponse} from "mocks/groupFactory";
import {mockNotificationsReponse} from "mocks/notificationFactory";
import {mockAuthHeaders, DEFAULT_BASE_API} from "mocks/authHeadersFactory";
import {
  mockUserInfoResponse,
  mockFollowArtistResponse,
  mockUnfollowArtistResponse
} from "mocks/userFactory";

const authHeaders = mockAuthHeaders();
const {userid} = authHeaders;

const userInfoResponse = mockUserInfoResponse();
const subscribedArtistsResponse = mockArtistResponse();
const subscribedGroupsResponse = mockSubscribedGroupsResponse();
const notificationsResponse = mockNotificationsReponse();
const followArtistResponse = mockFollowArtistResponse();
const unfollowArtistResponse = mockUnfollowArtistResponse();
const artist = mockArtist();

const mockGetUserInfo = rest.get(
  `${DEFAULT_BASE_API}/users/${userid}/info`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(userInfoResponse));
  }
);

const mockGetSubscribedArtists = rest.get(
  `${DEFAULT_BASE_API}/users/${userid}/artists`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(subscribedArtistsResponse));
  }
);

const mockGetSubscribedGroups = rest.get(
  `${DEFAULT_BASE_API}/users/${userid}/groups`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(subscribedGroupsResponse));
  }
);

const mockGetNotifications = rest.get(
  `${DEFAULT_BASE_API}/users/${userid}/notifications`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(notificationsResponse));
  }
);

const mockFollowArtist = rest.post(
  `${DEFAULT_BASE_API}/users/${userid}/follow/artist/${artist.artistUserId}`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(followArtistResponse));
  }
);

const mockUnfollowArtist = rest.post(
  `${DEFAULT_BASE_API}/users/${userid}/unfollow/artist/${artist.artistUserId}`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(unfollowArtistResponse));
  }
);

const server = setupServer(
  mockGetUserInfo,
  mockGetSubscribedArtists,
  mockGetSubscribedGroups,
  mockGetNotifications,
  mockFollowArtist,
  mockUnfollowArtist
);

setupServerActions(server);

describe("UserController", () => {
  test("getInfo", async () => {
    const response = await UserController.getInfo(authHeaders);
    expect(response).toEqual(userInfoResponse);
  });

  test("getSubscribedArtists", async () => {
    const response = await UserController.getSubscribedArtists(authHeaders);
    expect(response).toEqual(subscribedArtistsResponse);
  });

  test("getSubscribedGroups", async () => {
    const response = await UserController.getSubscribedGroups(authHeaders);
    expect(response).toEqual(subscribedGroupsResponse);
  });

  test("getNotifications", async () => {
    const response = await UserController.getNotifications(authHeaders);
    expect(response).toEqual(notificationsResponse);
  });

  test("followArtist", async () => {
    const response = await UserController.followArtist(
      artist.artistUserId,
      authHeaders
    );
    expect(response).toEqual(followArtistResponse);
  });

  test("unfollowArtist", async () => {
    const response = await UserController.unfollowArtist(
      artist.artistUserId,
      authHeaders
    );
    expect(response).toEqual(unfollowArtistResponse);
  });
});
