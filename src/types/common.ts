import environment from "Constants/environment";
import {yesNo, zeroOrOne} from "Constants/common";

export type GenericObject = {[key: string]: any};
export type Nullable<T> = T | null;
export type ValueOf<T> = T[keyof T];
export type YesNo = ValueOf<typeof yesNo>;
export type ZeroOrOne = ValueOf<typeof zeroOrOne>;
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
};

export type ApiConfigByEnvironment = {
  [environment in Environment]: ApiConfig;
};
