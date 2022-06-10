import {AxiosResponse, AxiosError} from "axios";

export default class LoggingController {
  log(message: string): void {
    console.info(`[info]: ${message}`);
  }

  logError(message: string): void {
    console.error(`[error]: ${message}`);
  }

  logWarning(message: string): void {
    console.warn(`[warn]: ${message}`);
  }

  logSuccessReponse(response: AxiosResponse): void {
    return this.log(
      `${response.status} ${
        response.statusText
      } - ${response.config.method?.toUpperCase()} ${response.config.url}`
    );
  }

  logErrorReponse(error: AxiosError): void {
    this.logError(
      `${error.code} ${error.message} - ${error.config.method?.toUpperCase()} ${
        error.config.url
      }`
    );
  }
}
