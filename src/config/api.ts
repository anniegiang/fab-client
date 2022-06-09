import "dotenv/config";
import environment from "Config/environment";
import environments from "Constants/environment";
import {ApiConfig, ApiConfigByEnvironment} from "Types/coreTypes";

const api: ApiConfigByEnvironment = {
  [environments.development]: {
    accessToken: process.env.ACCESS_TOKEN,
    userId: process.env.USER_ID,
    baseApi: "https://vip-fab-api.myfab.tv/2",
    userAgent: "fab|ios|appstore|1.2.0|15.5|iPhone11,8|apple|en|US"
  }
};

export default api[environment] as ApiConfig;
