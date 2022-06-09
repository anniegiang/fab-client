import api from "Config/api";

export default class BaseController {
  accessToken?: string;
  userId?: string;
  host: string;
  hostDomain: string;
  apiVersion: string;
  os: string;
  userAgent: string;

  constructor() {
    this.accessToken = api.accessToken;
    this.userId = api.userId;
    this.host = api.host;
    this.hostDomain = api.hostDomain;
    this.apiVersion = api.apiVersion;
    this.os = api.os;
    this.userAgent = api.userAgent;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken && !!this.userId;
  }

  get baseApi(): string {
    return `https://${this.host}/${this.hostDomain}/${this.apiVersion}`;
  }

  get defaultHeaders() {
    return {
      Host: this.host,
      os: this.os,
      userid: this.userId,
      "User-Agent": this.userAgent,
      accesstoken: this.accessToken,
      Accept: "*/*",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br"
    };
  }
}
