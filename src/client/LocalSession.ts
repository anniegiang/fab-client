import LocalStorage from "./LocalStorage";
import LocalStorageKeys from "Constants/localStorageKeys";
import {Nullable} from "Types/common";

const {AccessToken, UserId} = LocalStorageKeys;

class LocalSession {
  get accessToken(): Nullable<string> {
    return LocalStorage.get(AccessToken);
  }

  get userId(): Nullable<string> {
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

export default new LocalSession();
