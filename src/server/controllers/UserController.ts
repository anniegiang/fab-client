import BaseController from "Controllers/BaseController";
import {UserInfoResponse} from "Types/user";
import {ArtistResponse} from "Types/artist";
import {SubscribedGroupsResponse} from "Types/group";

export class UserController extends BaseController {
  constructor() {
    super();
  }

  get baseUrl(): string {
    return `/users/${this.userId}`;
  }

  async getInfo(): Promise<UserInfoResponse> {
    const response = await this.api.get(`${this.baseUrl}/info`);
    return this.respond(response);
  }

  async getSubscribedGroups(): Promise<SubscribedGroupsResponse> {
    const response = await this.api.get(`${this.baseUrl}/groups`);
    return this.respond(response);
  }

  async getSubscribedArtists(): Promise<ArtistResponse> {
    const response = await this.api.get(`${this.baseUrl}/artists`);
    return this.respond(response);
  }
}

export default new UserController();
