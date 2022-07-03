import MessageController from "server/controllers/MessageController";
import {rest} from "msw";
import {setupServer} from "msw/node";
import setupServerActions from "mocks/setupServerActions";
import {mockComment, mockCommentsReponse} from "mocks/commentFactory";
import {mockAuthHeaders, DEFAULT_BASE_API} from "mocks/authHeadersFactory";
import {
  mockMessage,
  mockNewestMessagesResponse,
  mockLetterMessageResponse
} from "mocks/messageFactory";

const authHeaders = mockAuthHeaders();
const {userid} = authHeaders;

const message = mockMessage({userId: userid});
const comment1 = mockComment({id: 1, messageId: message.id});
const comment2 = mockComment({id: 2, messageId: message.id});

const newestMessageResponse = mockNewestMessagesResponse({messages: [message]});
const letterMessageResponse = mockLetterMessageResponse({message});
const commentsResponse = mockCommentsReponse({comments: [comment1]});
const commentsPaginatedResponse = mockCommentsReponse({
  comments: [comment1, comment2]
});

const mockGetNewestMessages = rest.get(
  `${DEFAULT_BASE_API}/users/${userid}/messages`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(newestMessageResponse));
  }
);

const mockGetMessageDetails = rest.get(
  `${DEFAULT_BASE_API}/users/${userid}/message/${message.id}`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(letterMessageResponse));
  }
);

const mockGetMessagesComments = rest.get(
  `${DEFAULT_BASE_API}/users/${userid}/message/${message.id}/ncomments`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentsResponse));
  }
);

const mockGetMessagesCommentsPaginated = rest.get(
  `${DEFAULT_BASE_API}/users/${userid}/message/${message.id}/ncomments/${comment1.id}?direction=P`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentsPaginatedResponse));
  }
);

const mockAddMessageComment = rest.post(
  `${DEFAULT_BASE_API}/users/${userid}/message/${message.id}/comment/add`,
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(comment1));
  }
);

const server = setupServer(
  mockGetNewestMessages,
  mockGetMessageDetails,
  mockGetMessagesComments,
  mockGetMessagesCommentsPaginated,
  mockAddMessageComment
);

setupServerActions(server);

describe("MessageController", () => {
  test("getMessages", async () => {
    const response = await MessageController.getNewestMessages(authHeaders);
    expect(response).toEqual(newestMessageResponse);
  });

  test("getMessageDetails", async () => {
    const response = await MessageController.getMessageDetails(
      message.id,
      authHeaders
    );
    expect(response).toEqual(letterMessageResponse);
  });

  test("getMessageComments", async () => {
    const response = await MessageController.getMessageComments(
      authHeaders,
      message.id
    );
    expect(response).toEqual(commentsResponse);
  });

  test("getMessageComments (paginated)", async () => {
    const response = await MessageController.getMessageComments(
      authHeaders,
      message.id,
      comment1.id
    );
    expect(response).toEqual(commentsPaginatedResponse);
  });

  test("addMessageComment", async () => {
    const response = await MessageController.addMessageComment(
      authHeaders,
      message.id,
      comment1.comment
    );
    expect(response).toEqual(comment1);
  });
});
