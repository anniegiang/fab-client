import environment from "Constants/environment";

export type Environment = keyof typeof environment;

export type ApiConfig = {
  accessToken?: string;
  userId?: string;
  baseApi: string;
  userAgent: string;
};
export type ApiConfigByEnvironment = {
  [environment in Environment]: ApiConfig;
};
