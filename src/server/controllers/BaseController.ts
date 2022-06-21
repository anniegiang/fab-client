import HttpClient, {HttpClientInstance} from "Server/services/HttpClient";
import api from "Config/api";

export default class BaseController extends HttpClient {
  host: string;
  hostDomain: string;
  apiVersion: string;
  os: string;
  userAgent: string;

  constructor() {
    super();
    this.host = api.host;
    this.hostDomain = api.hostDomain;
    this.apiVersion = api.apiVersion;
    this.os = api.os;
    this.userAgent = api.userAgent;
  }

  get api(): HttpClientInstance {
    return this.httpClient.create({
      baseURL: this.baseApi,
      headers: this.defaultHeaders,
      timeout: 2000
    });
  }

  get baseApi(): string {
    return `https://${this.host}/${this.hostDomain}/${this.apiVersion}`;
  }

  get defaultHeaders() {
    return {
      Host: this.host,
      os: this.os,
      "User-Agent": this.userAgent,
      Accept: "*/*",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br"
    };
  }
}
