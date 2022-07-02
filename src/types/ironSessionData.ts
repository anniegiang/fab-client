import {AuthHeaders} from "types/session";

declare module "iron-session" {
  interface IronSessionData {
    authHeaders: AuthHeaders;
  }
}

export {};
