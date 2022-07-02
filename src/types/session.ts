import {Id, Nullable} from "types/common";

export type SessionResponse = {
  isAuthenticated: boolean;
  isError: boolean;
};

export type LoginFields = {
  userId: string;
  accessToken: string;
};

export type AuthHeaders = {
  userid: Id;
  accesstoken: string;
};

export type LocalUserId = Nullable<string>;
export type LocalAccessToken = Nullable<string>;
