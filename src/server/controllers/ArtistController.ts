import axios from "axios";
import BaseController from "Controllers/BaseController";
import {Id} from "Types/common";
import {ArtistMessageResponse} from "Types/message";

class ArtistController extends BaseController {
  constructor() {
    super();
  }

  private baseUrl(artistId: Id): string {
    return `${this.baseApi}/artists/${artistId}`;
  }

  async getMessages(artistId: Id): Promise<ArtistMessageResponse> {
    const response = await axios.get(`${this.baseUrl(artistId)}/messages`, {
      headers: this.defaultHeaders
    });

    return this.respond(response);
  }
}

export default new ArtistController();
