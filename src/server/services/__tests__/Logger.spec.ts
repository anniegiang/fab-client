import Logger from "server/services/Logger";
import {HttpClientResponse, HttpClientError} from "server/services/HttpClient";

describe("Logger", () => {
  const logger = new Logger();
  const message = "testing that something was wrong";

  test("log - logs a message as an info", () => {
    const spy = jest.spyOn(console, "info");
    logger.log(message);
    expect(spy).toHaveBeenNthCalledWith(1, `[info]: ${message}`);
    spy.mockRestore();
  });

  test("logError - logs a message as an error", () => {
    const spy = jest.spyOn(console, "error");
    logger.logError(message);
    expect(spy).toHaveBeenNthCalledWith(1, `[error]: ${message}`);
    spy.mockRestore();
  });

  test("logWarning - logs a message as a warning", () => {
    const spy = jest.spyOn(console, "warn");
    logger.logWarning(message);
    expect(spy).toHaveBeenNthCalledWith(1, `[warn]: ${message}`);
    spy.mockRestore();
  });

  test("logSuccessReponse", () => {
    const spy = jest.spyOn(console, "info");
    const response: HttpClientResponse = {
      data: [],
      status: 201,
      statusText: "OK",
      headers: {},
      config: {method: "GET", url: "api.endpoint"}
    };

    logger.logSuccessReponse(response);

    expect(spy).toHaveBeenNthCalledWith(
      1,
      `[info]: ${response.status} ${
        response.statusText
      } - ${response.config.method?.toUpperCase()} ${response.config.url}`
    );

    spy.mockRestore();
  });

  test("logErrorReponse", () => {
    const spy = jest.spyOn(console, "error");
    const error: HttpClientError = {
      code: "400",
      message: "oh no",
      config: {method: "get", url: "api.endpoint"},
      name: "error_name",
      isAxiosError: false,
      toJSON: jest.fn()
    };

    logger.logErrorReponse(error);

    expect(spy).toHaveBeenNthCalledWith(
      1,
      `[error]: ${error.code} ${
        error.message
      } - ${error.config.method?.toUpperCase()} ${error.config.url}`
    );

    spy.mockRestore();
  });
});
