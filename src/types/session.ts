import {Id} from "./common";

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
