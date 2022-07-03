import ArtistController from "server/controllers/ArtistController";
import {rest} from "msw";
import {setupServer} from "msw/node";
import {mockArtistUser} from "../../../mocks/artistFactory";
import {
  mockMessage,
  mockArtistMessageResponse
} from "../../../mocks/messageFactory";

import {
  mockAuthHeaders,
  DEFAULT_BASE_API
} from "../../../mocks/authHeadersFactory";

const authHeaders = mockAuthHeaders();
const {userid} = authHeaders;
const artist = mockArtistUser({id: userid});
const message = mockMessage({userId: userid});
const artistMessageResponse = mockArtistMessageResponse({messages: [message]});

const mockGetUserInfo = rest.get(
  `${DEFAULT_BASE_API}/artists/${userid}/messages`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(artistMessageResponse));
  }
);

const server = setupServer(mockGetUserInfo);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ArtistController", () => {
  test("getMessages", async () => {
    const response = await ArtistController.getMessages(artist.id, authHeaders);
    expect(response).toEqual(artistMessageResponse);
  });
});
