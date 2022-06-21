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

  async getGroupInfo(
    groupId: Id,
    authHeaders: AuthHeaders
  ): Promise<GroupResponse> {
    const response = await this.api.get(`${this.baseUrl}/${groupId}`, {
      headers: {...this.defaultHeaders, ...authHeaders}
    });
    return this.respond(response);
  }

  async getGroupMessages(
    groupId: Id,
    authHeaders: AuthHeaders
  ): Promise<GroupMessageResponse> {
    const response = await this.api.get(`${this.baseUrl}/${groupId}/messages`, {
      headers: {...this.defaultHeaders, ...authHeaders}
    });
    return this.respond(response);
  }
}

export default new GroupController();
