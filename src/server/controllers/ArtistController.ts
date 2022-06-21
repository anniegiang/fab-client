import BaseController from "Controllers/BaseController";
import {Id} from "Types/common";
import {ArtistMessageResponse} from "Types/message";
import {AuthHeaders} from "Types/session";

class ArtistController extends BaseController {
  constructor() {
    super();
  }

  private baseUrl(artistId: Id): string {
    return `/artists/${artistId}`;
  }

  async getMessages(
    artistId: Id,
    authHeaders: AuthHeaders
  ): Promise<ArtistMessageResponse> {
    const response = await this.api.get(`${this.baseUrl(artistId)}/messages`, {
      headers: {...this.defaultHeaders, ...authHeaders}
    });
    return this.respond(response);
  }
}

export default new ArtistController();
