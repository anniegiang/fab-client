import environment from "Constants/environment";
import {yesNo, zeroOrOne} from "Constants/common";

export type YesNo = typeof yesNo[keyof typeof yesNo];
export type ZeroOrOne = typeof zeroOrOne[keyof typeof zeroOrOne];
export type ImageUrl = string;
export type TimeValueOf = number;
export type Id = string;

export type Environment = keyof typeof environment;

export type ApiConfig = {
  accessToken?: string;
  userId?: Id;
  host: string;
  hostDomain: string;
  apiVersion: string;
  os: string;
  userAgent: string;
};

export type ApiConfigByEnvironment = {
  [environment in Environment]: ApiConfig;
};
