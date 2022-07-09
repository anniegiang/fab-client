/* eslint-disable no-console */

import {HttpClientResponse, HttpClientError} from "server/services/HttpClient";

export default class Logger {
  log(message: string): void {
    console.info(`[info]: ${message}`);
  }

  logError(message: string): void {
    console.error(`[error]: ${message}`);
  }

  logWarning(message: string): void {
    console.warn(`[warn]: ${message}`);
  }

  logSuccessReponse(response: HttpClientResponse): void {
    this.log(
      `${response.status} ${
        response.statusText
      } - ${response.config.method?.toUpperCase()} ${response.config.url}`
    );
  }

  logErrorReponse({data: {error}}: HttpClientResponse): void {
    this.logError(
      `${error.error_code} ${error.config?.method?.toUpperCase()} ${
        error.config?.url
      } - ${error.error_msg}`
    );
  }

  logHttpError(error: HttpClientError): void {
    this.logError(
      `${error.code} ${error.message} - ${error.config.method?.toUpperCase()} ${
        error.config.url
      }`
    );
  }
}
