import BaseController from "server/controllers/BaseController";
import {Id} from "types/common";
import {GroupResponse} from "types/group";
import {GroupMessagseResponse} from "types/message";
import {AuthHeaders} from "types/session";

class GroupController extends BaseController {
  constructor() {
    super();
  }

  get baseUrl(): string {
    return "/groups";
  }

  async defaultGet(api: string, authHeaders: AuthHeaders) {
    return this.api.get(`${this.baseUrl}${api}`, {
      headers: {...this.defaultHeaders, ...authHeaders}
    });
  }

  async getGroupInfo(
    groupId: Id,
    authHeaders: AuthHeaders
  ): Promise<GroupResponse> {
    const response = await this.defaultGet(`/${groupId}`, authHeaders);
    return this.respond(response);
  }

  async getGroupMessages(
    groupId: Id,
    authHeaders: AuthHeaders
  ): Promise<GroupMessagseResponse> {
    const response = await this.defaultGet(`/${groupId}/messages`, authHeaders);
    return this.respond(response);
  }
}

export default new GroupController();
