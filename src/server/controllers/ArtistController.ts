import BaseController from "server/controllers/BaseController";
import {Id} from "types/common";
import {ArtistMessageResponse} from "types/message";
import {AuthHeaders} from "types/session";

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
