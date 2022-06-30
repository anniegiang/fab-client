import BaseController from "Controllers/BaseController";
import {Id} from "Types/common";
import {GroupResponse} from "Types/group";
import {GroupMessageResponse} from "Types/message";
import {AuthHeaders} from "Types/session";

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
  ): Promise<GroupMessageResponse> {
    const response = await this.defaultGet(`/${groupId}/messages`, authHeaders);
    return this.respond(response);
  }
}

export default new GroupController();
