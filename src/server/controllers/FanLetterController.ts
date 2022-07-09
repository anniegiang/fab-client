import {UserController} from "server/controllers/UserController";
import {AuthHeaders} from "types/session";
import {Id} from "types/common";
import {
  FanLetterResponse,
  FanLettersReponse,
  SendFanLetterResponse,
  DeleteFanLetterResponse
} from "types/fanLetter";

class FanLetterController extends UserController {
  async getFanLetter(
    fanLetterId: Id,
    authHeaders: AuthHeaders
  ): Promise<FanLetterResponse> {
    const response = await this.defaultGet(
      `/fanletter/${fanLetterId}`,
      authHeaders
    );
    return this.respond(response);
  }

  async getFanLetters(authHeaders: AuthHeaders): Promise<FanLettersReponse> {
    const response = await this.defaultGet("/fanletters/sent", authHeaders);
    return this.respond(response);
  }

  async sendFanLetter(
    artistUserId: Id,
    authHeaders: AuthHeaders,
    body: string
  ): Promise<SendFanLetterResponse> {
    const response = await this.defaultPost(
      `/fanletter/add/artist/${artistUserId}`,
      authHeaders,
      body
    );
    return this.respond(response);
  }

  async deleteFanLetter(
    fanLetterId: Id,
    authHeaders: AuthHeaders
  ): Promise<DeleteFanLetterResponse> {
    const response = await this.defaultPost(
      `/fanletter/${fanLetterId}/delete`,
      authHeaders
    );
    return this.respond(response);
  }
}

export default new FanLetterController();
