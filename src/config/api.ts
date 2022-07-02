import "dotenv/config";
import environment from "config/environment";
import environments from "constants/environment";
import {ApiConfig, ApiConfigByEnvironment} from "types/common";

const defaultHeaders = {
  host: "vip-fab-api.myfab.tv",
  hostDomain: "fapi",
  apiVersion: "2",
  os: "ios",
  userAgent: "fab|ios|appstore|1.2.0|15.5|iPhone11,8|apple|en|US"
};

const api: ApiConfigByEnvironment = {
  [environments.development]: {
    ...defaultHeaders,
    userid: process.env.NEXT_PUBLIC_USER_ID ?? null,
    accesstoken: process.env.NEXT_PUBLIC_ACCESS_TOKEN ?? null
  },
  [environments.production]: {
    ...defaultHeaders,
    userid: null,
    accesstoken: null
  }
};

export default api[environment] as ApiConfig;
