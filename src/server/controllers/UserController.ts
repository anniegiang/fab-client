import BaseController from "Controllers/BaseController";
import {UserInfoResponse} from "Types/user";
import {ArtistResponse} from "Types/artist";
import {SubscribedGroupsResponse} from "Types/group";
import {Id} from "Types/common";
import {AuthHeaders} from "Types/session";

export class UserController extends BaseController {
  constructor() {
    super();
  }

  baseUrl(userId: Id): string {
    return `/users/${userId}`;
  }

  async getInfo(authHeaders: AuthHeaders): Promise<UserInfoResponse> {
    const response = await this.api.get(
      `${this.baseUrl(authHeaders.userid)}/info`,
      {headers: {...this.defaultHeaders, ...authHeaders}}
    );
    return this.respond(response);
  }

  async getSubscribedGroups(
    authHeaders: AuthHeaders
  ): Promise<SubscribedGroupsResponse> {
    const response = await this.api.get(
      `${this.baseUrl(authHeaders.userid)}/groups`,
      {headers: {...this.defaultHeaders, ...authHeaders}}
    );
    return this.respond(response);
  }

  async getSubscribedArtists(
    authHeaders: AuthHeaders
  ): Promise<ArtistResponse> {
    const response = await this.api.get(
      `${this.baseUrl(authHeaders.userid)}/artists`,
      {headers: {...this.defaultHeaders, ...authHeaders}}
    );
    return this.respond(response);
  }
}

export default new UserController();
