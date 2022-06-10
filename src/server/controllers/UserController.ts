import axios, {AxiosResponse} from "axios";
import BaseController from "./BaseController";

export class UserController extends BaseController {
  constructor() {
    super();
  }

  get baseUrl(): string {
    return `${this.baseApi}/users/${this.userId}`;
  }

  async getInfo(): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/info`, {
      headers: this.defaultHeaders
    });
  }

  async getSubscribedArtists(): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/artists`, {
      headers: this.defaultHeaders
    });
  }
}

export default new UserController();
