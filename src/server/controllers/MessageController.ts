import {Id} from "types/common";
import {UserController} from "server/controllers/UserController";
import {LetterMessageResponse, NewestMessagesResponse} from "types/message";
import {CommentsResponse, Comment} from "types/comment";
import {AuthHeaders} from "types/session";

class MessageController extends UserController {
  constructor() {
    super();
  }

  async defaultGet(api: string, authHeaders: AuthHeaders) {
    return this.api.get(`${this.baseUrl(authHeaders.userid)}${api}`, {
      headers: {...this.defaultHeaders, ...authHeaders}
    });
  }

  async getNewestMessages(
    authHeaders: AuthHeaders
  ): Promise<NewestMessagesResponse> {
    const response = await this.defaultGet("/messages", authHeaders);
    return this.respond(response);
  }

  async getMessageDetails(
    messageId: Id,
    authHeaders: AuthHeaders
  ): Promise<LetterMessageResponse> {
    const response = await this.defaultGet(
      `/message/${messageId}`,
      authHeaders
    );
    return this.respond(response);
  }

  async getMessageComments(
    authHeaders: AuthHeaders,
    messageId: Id,
    lastMessageId?: Id
  ): Promise<CommentsResponse> {
    const baseUrl = `/message/${messageId}/ncomments`;
    const paginatedUrl =
      lastMessageId !== undefined
        ? `${baseUrl}/${lastMessageId}?direction=P`
        : baseUrl;

    const response = await this.defaultGet(paginatedUrl, authHeaders);
    return this.respond(response);
  }

  async addMessageComment(
    authHeaders: AuthHeaders,
    messageId: Id,
    comment: string
  ): Promise<Comment> {
    const response = await this.api({
      method: "POST",
      url: `${this.baseUrl(
        authHeaders.userid
      )}/message/${messageId}/comment/add`,
      data: comment,
      headers: {
        ...this.defaultHeaders,
        ...authHeaders,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    return this.respond(response);
  }
}

export default new MessageController();
