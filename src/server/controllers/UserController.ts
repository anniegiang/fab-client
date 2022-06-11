import axios from "axios";
import BaseController from "Controllers/BaseController";
import {UserInfoResponse} from "Types/user";
import {ArtistResponse} from "Types/artist";

export class UserController extends BaseController {
  constructor() {
    super();
  }

  get baseUrl(): string {
    return `${this.baseApi}/users/${this.userId}`;
  }

  async getInfo(): Promise<UserInfoResponse> {
    const response = await axios.get(`${this.baseUrl}/info`, {
      headers: this.defaultHeaders
    });

    return this.respond(response);
  }

  async getSubscribedArtists(): Promise<ArtistResponse> {
    const response = await axios.get(`${this.baseUrl}/artists`, {
      headers: this.defaultHeaders
    });

    return this.respond(response);
  }
}

export default new UserController();
