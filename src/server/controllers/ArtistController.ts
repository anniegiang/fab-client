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

  async defaultGet(artistId: Id, slug: string, authHeaders: AuthHeaders) {
    return this.api.get(`${this.baseUrl(artistId)}${slug}`, {
      headers: {...this.defaultHeaders, ...authHeaders}
    });
  }

  async getMessages(
    artistId: Id,
    authHeaders: AuthHeaders
  ): Promise<ArtistMessageResponse> {
    const response = await this.defaultGet(artistId, "/messages", authHeaders);
    return this.respond(response);
  }
}

export default new ArtistController();
