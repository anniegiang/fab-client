import "dotenv/config";
import environment from "Config/environment";
import environments from "Constants/environment";
import {ApiConfig, ApiConfigByEnvironment} from "Types/coreTypes";

const api: ApiConfigByEnvironment = {
  [environments.development]: {
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    userId: Number(process.env.NEXT_PUBLIC_USER_ID),
    host: "vip-fab-api.myfab.tv",
    hostDomain: "fapi",
    apiVersion: "2",
    os: "ios",
    userAgent: "fab|ios|appstore|1.2.0|15.5|iPhone11,8|apple|en|US"
  }
};

export default api[environment] as ApiConfig;
