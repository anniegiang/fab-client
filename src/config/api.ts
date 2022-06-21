import "dotenv/config";
import environment from "Config/environment";
import environments from "Constants/environment";
import {ApiConfig, ApiConfigByEnvironment} from "Types/common";

const defaultHeaders = {
  host: "vip-fab-api.myfab.tv",
  hostDomain: "fapi",
  apiVersion: "2",
  os: "ios",
  userAgent: "fab|ios|appstore|1.2.0|15.5|iPhone11,8|apple|en|US"
};

const api: ApiConfigByEnvironment = {
  [environments.development]: defaultHeaders,
  [environments.production]: defaultHeaders
};

export default api[environment] as ApiConfig;
