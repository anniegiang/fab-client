import api from "Config/api";
import {Id} from "Types/coreTypes";

export default class BaseController {
  accessToken?: string;
  userId?: Id;
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

  get isAuthenticated(): boolean {
    return !!this.accessToken && !!this.userId;
  }

  get baseApi(): string {
    return `https://${this.host}/${this.hostDomain}/${this.apiVersion}`;
  }

  get defaultHeaders() {
    if (!this.isAuthenticated) return;

    return {
      Host: this.host,
      os: this.os,
      userid: this.userId!,
      "User-Agent": this.userAgent,
      accesstoken: this.accessToken!,
      Accept: "*/*",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br"
    };
  }
}
