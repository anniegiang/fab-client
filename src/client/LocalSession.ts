import LocalStorage from "./LocalStorage";
import LocalStorageKeys from "constants/localStorageKeys";
import {LocalUserId, LocalAccessToken} from "types/session";
import api from "config/api";
import environment from "config/environment";
import environments from "constants/environment";
import Logger from "server/services/Logger";

const {AccessToken, UserId} = LocalStorageKeys;

class LocalSession {
  get accessToken(): LocalAccessToken {
    return LocalStorage.get(AccessToken);
  }

  get userId(): LocalUserId {
    return LocalStorage.get(UserId);
  }

  set updateAccessToken(accessToken: string) {
    LocalStorage.set(AccessToken, accessToken);
  }

  set updateUserId(userId: string) {
    LocalStorage.set(UserId, userId);
  }

  logout() {
    LocalStorage.remove(UserId);
    LocalStorage.remove(AccessToken);
  }
}

class LocalStorageDev extends Logger {
  unsupportedError() {
    this.logError("This action is not supported locally");
  }

  get accessToken(): LocalAccessToken {
    return api.accesstoken || null;
  }

  get userId(): LocalUserId {
    return api.userid || null;
  }

  set updateAccessToken(_: string) {
    this.unsupportedError();
  }

  set updateUserId(_: string) {
    this.unsupportedError();
  }

  logout() {
    this.unsupportedError();
  }
}

export default environment === environments.development
  ? new LocalStorageDev()
  : new LocalSession();
