import axios, {AxiosResponse} from "axios";
import {Id} from "Types/coreTypes";
import {UserController} from "./UserController";

class MessageController extends UserController {
  constructor() {
    super();
  }

  async getMessageDetails(messageId: Id): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/message/${messageId}`, {
      headers: this.defaultHeaders
    });
  }

  async getMessageComments(
    messageId: Id,
    lastMessageId?: Id
  ): Promise<AxiosResponse> {
    const baseUrl = `${this.baseUrl}/message/${messageId}/ncomments`;

    const paginatedUrl =
      lastMessageId !== undefined
        ? `${baseUrl}/${lastMessageId}?direction=P`
        : baseUrl;

    return axios.get(paginatedUrl, {
      headers: this.defaultHeaders
    });
  }
}

export default new MessageController();
