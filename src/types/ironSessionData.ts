import {AuthHeaders} from "Types/session";

declare module "iron-session" {
  interface IronSessionData {
    authHeaders: AuthHeaders;
  }
}

export {};
