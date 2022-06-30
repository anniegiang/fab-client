import BaseController from "Controllers/BaseController";
import {UserInfoResponse} from "Types/user";
import {ArtistResponse} from "Types/artist";
import {SubscribedGroupsResponse} from "Types/group";
import {Id} from "Types/common";
import {AuthHeaders} from "Types/session";
import {NotificationsReponse} from "Types/notification";

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
