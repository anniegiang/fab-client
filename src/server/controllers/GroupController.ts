import axios from "axios";
import BaseController from "Controllers/BaseController";
import {Id} from "Types/coreTypes";
import {GroupResponse} from "Types/groups";
import {GroupMessageResponse} from "Types/message";

class GroupController extends BaseController {
  constructor() {
    super();
  }

  get baseUrl(): string {
    return `${this.baseApi}/groups`;
  }

  async getGroupInfo(groupId: Id): Promise<GroupResponse> {
    const response = await axios.get(`${this.baseUrl}/${groupId}`, {
      headers: this.defaultHeaders
    });

    return this.respond(response);
  }

  async getGroupMessages(groupId: Id): Promise<GroupMessageResponse> {
    const response = await axios.get(`${this.baseUrl}/${groupId}/messages`, {
      headers: this.defaultHeaders
    });

    return this.respond(response);
  }
}

export default new GroupController();
