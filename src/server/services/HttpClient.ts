import axios, {
  AxiosStatic,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance
} from "axios";
import Logger from "Server/services/Logger";

export type HttpClientRequestConfig = AxiosRequestConfig;
export type HttpClientResponse = AxiosResponse;
export type HttpClientError = AxiosError;
export type HttpClientInstance = AxiosInstance;
export default class HttpClient extends Logger {
  httpClient: AxiosStatic;

  constructor() {
    super();
    this.httpClient = axios;
  }

  respond(response: HttpClientResponse | HttpClientError) {
    const _response = response as HttpClientResponse;

    if (this.isSuccess(_response.status)) {
      this.logSuccessReponse(_response);
      return _response.data;
    }

    this.logErrorReponse(response as HttpClientError);
    return response as HttpClientError;
  }

  isSuccess(status: number): boolean {
    return status === 200 || status % 200 === 1;
  }
}
