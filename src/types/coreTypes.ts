import environment from "Constants/environment";

export type Environment = keyof typeof environment;

export type ApiConfig = {
  accessToken?: string;
  userId?: string;
  host: string;
  hostDomain: string;
  apiVersion: string;
  os: string;
  userAgent: string;
};
export type ApiConfigByEnvironment = {
  [environment in Environment]: ApiConfig;
};
