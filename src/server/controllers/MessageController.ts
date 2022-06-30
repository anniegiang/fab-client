import {Id} from "Types/common";
import {UserController} from "Controllers/UserController";
import {LetterMessageResponse, NewestMessagesResponse} from "Types/message";
import {CommentsResponse, Comment} from "Types/comment";
import {AuthHeaders} from "Types/session";

class MessageController extends UserController {
  constructor() {
    super();
  }

  async getNewestMessages(
    authHeaders: AuthHeaders
  ): Promise<NewestMessagesResponse> {
    const response = await this.api.get(
      `${this.baseUrl(authHeaders.userid)}/messages`,
      {headers: {...this.defaultHeaders, ...authHeaders}}
    );
    return this.respond(response);
  }

  async getMessageDetails(
    messageId: Id,
    authHeaders: AuthHeaders
  ): Promise<LetterMessageResponse> {
    const response = await this.api.get(
      `${this.baseUrl(authHeaders.userid)}/message/${messageId}`,
      {headers: {...this.defaultHeaders, ...authHeaders}}
    );
    return this.respond(response);
  }

  async getMessageComments(
    authHeaders: AuthHeaders,
    messageId: Id,
    lastMessageId?: Id
  ): Promise<CommentsResponse> {
    const baseUrl = `${this.baseUrl(
      authHeaders.userid
    )}/message/${messageId}/ncomments`;

    const paginatedUrl =
      lastMessageId !== undefined
        ? `${baseUrl}/${lastMessageId}?direction=P`
        : baseUrl;

    const response = await this.api.get(paginatedUrl, {
      headers: {...this.defaultHeaders, ...authHeaders}
    });
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
