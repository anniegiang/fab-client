import axios, {AxiosResponse} from "axios";
import BaseController from "./BaseController";
import {Id} from "Types/coreTypes";

class ArtistController extends BaseController {
  constructor() {
    super();
  }

  private baseUrl(artistId: Id): string {
    return `${this.baseApi}/artists/${artistId}`;
  }

  async getMessages(artistId: Id): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl(artistId)}/messages`, {
      headers: this.defaultHeaders
    });
  }
}

export default new ArtistController();
