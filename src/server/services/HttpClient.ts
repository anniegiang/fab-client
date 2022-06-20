import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from "axios";
import Logger from "Server/services/Logger";

export type HttpClientRequestConfig = AxiosRequestConfig;
export type HttpClientResponse = AxiosResponse;
export type HttpClientError = AxiosError;

export default class HttpClient extends Logger {
  httpClient: AxiosInstance;

  constructor(config?: HttpClientRequestConfig) {
    super();
    this.httpClient = axios.create(config);
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
