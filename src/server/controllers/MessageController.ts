import axios from "axios";
import {Id} from "Types/coreTypes";
import {UserController} from "Controllers/UserController";
import {LetterMessageResponse} from "Types/message";
import {CommentsResponse} from "Types/comment";

class MessageController extends UserController {
  constructor() {
    super();
  }

  async getMessageDetails(messageId: Id): Promise<LetterMessageResponse> {
    const response = await axios.get(`${this.baseUrl}/message/${messageId}`, {
      headers: this.defaultHeaders
    });

    return this.respond(response);
  }

  async getMessageComments(
    messageId: Id,
    lastMessageId?: Id
  ): Promise<CommentsResponse> {
    const baseUrl = `${this.baseUrl}/message/${messageId}/ncomments`;

    const paginatedUrl =
      lastMessageId !== undefined
        ? `${baseUrl}/${lastMessageId}?direction=P`
        : baseUrl;

    const response = await axios.get(paginatedUrl, {
      headers: this.defaultHeaders
    });

    return this.respond(response);
  }
}

export default new MessageController();
