import BaseController from "server/controllers/BaseController";
import {SessionResponse} from "types/session";
import {Id} from "types/common";

export default class SessionContoller extends BaseController {
  constructor() {
    super();
  }

  async login(userId: Id, accessToken: string): Promise<SessionResponse> {
    let isAuthenticated = false;

    try {
      const response = await this.api.get(`/users/${userId}/info`, {
        headers: {
          ...this.defaultHeaders,
          userid: userId,
          accesstoken: accessToken
        }
      });

      if (response.data && !response.data.error) {
        isAuthenticated = true;
        this.logSuccessReponse(response);
      } else {
        this.logWarning("Invalid credentials");
      }

      return {isAuthenticated, isError: false};
    } catch (error) {
      this.logWarning("Error logging in");
      return {isAuthenticated, isError: true};
    }
  }
}

export const SessionControllerInstance = new SessionContoller();
