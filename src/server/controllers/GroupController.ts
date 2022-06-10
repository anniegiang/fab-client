import axios from "axios";
import BaseController from "./BaseController";
import {Id} from "Types/coreTypes";
import {GroupResponse} from "Types/groups";

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
}

export default new GroupController();
