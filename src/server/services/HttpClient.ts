import axios, {
  AxiosStatic,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance
} from "axios";
import Logger from "server/services/Logger";

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
    const isResponseError = !!(_response.data && _response.data.error);
    const isSuccess = this.isSuccess(_response.status);

    if (isSuccess && !isResponseError) {
      this.logSuccessReponse(_response);
      return _response.data;
    }

    if (isResponseError || (isResponseError && isSuccess)) {
      this.logErrorReponse(_response);
      return _response.data;
    }

    const httpError = response as HttpClientError;
    this.logHttpError(httpError);

    return httpError;
  }

  isSuccess(status: number): boolean {
    return status === 200 || status % 200 === 1;
  }
}
