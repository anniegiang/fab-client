import BaseController from "server/controllers/BaseController";
import {UserInfoResponse} from "types/user";
import {ArtistResponse} from "types/artist";
import {SubscribedGroupsResponse} from "types/group";
import {Id} from "types/common";
import {AuthHeaders} from "types/session";
import {NotificationsReponse} from "types/notification";

export class UserController extends BaseController {
  constructor() {
    super();
  }

  baseUrl(userId: Id): string {
    return `/users/${userId}`;
  }

  async defaultGet(api: string, authHeaders: AuthHeaders) {
    return this.api.get(`${this.baseUrl(authHeaders.userid)}${api}`, {
      headers: {...this.defaultHeaders, ...authHeaders}
    });
  }

  async getInfo(authHeaders: AuthHeaders): Promise<UserInfoResponse> {
    const response = await this.defaultGet("/info", authHeaders);
    return this.respond(response);
  }

  async getSubscribedGroups(
    authHeaders: AuthHeaders
  ): Promise<SubscribedGroupsResponse> {
    const response = await this.defaultGet("/groups", authHeaders);
    return this.respond(response);
  }

  async getSubscribedArtists(
    authHeaders: AuthHeaders
  ): Promise<ArtistResponse> {
    const response = await this.defaultGet("/artists", authHeaders);
    return this.respond(response);
  }

  async getNotifications(
    authHeaders: AuthHeaders
  ): Promise<NotificationsReponse> {
    const response = await this.defaultGet("/notifications", authHeaders);
    return this.respond(response);
  }
}

export default new UserController();
