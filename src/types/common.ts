import environment from "constants/environment";
import {YES_NO, ZERO_ONE} from "constants/common";
import {LocalUserId, LocalAccessToken} from "types/session";

export type GenericObject = {[key: string]: any};
export type Nullable<T> = T | null;
export type ValueOf<T> = T[keyof T];
export type YesNo = ValueOf<typeof YES_NO>;
export type ZeroOrOne = ValueOf<typeof ZERO_ONE>;
export type ImageUrl = string;
export type TimeValueOf = number;
export type TimestampWithTimezone = string;
export type Id = number;

export type Environment = keyof typeof environment;

export type ApiConfig = {
  host: string;
  hostDomain: string;
  apiVersion: string;
  os: string;
  userAgent: string;
  userid: LocalUserId;
  accesstoken: LocalAccessToken;
};

export type ApiConfigByEnvironment = {
  [environment in Environment]: ApiConfig;
};
