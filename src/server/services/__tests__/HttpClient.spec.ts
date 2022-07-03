import HttpClient, {
  HttpClientError,
  HttpClientResponse
} from "server/services/HttpClient";

describe("HttpClient", () => {
  const httpClient = new HttpClient();

  test("isSuccess - returns true for successful status codes", () => {
    [200, 201].forEach((code) => expect(httpClient.isSuccess(code)).toBe(true));
  });

  test("isSuccess - returns false for unsuccesful status codes", () => {
    [400, 404, 500].forEach((code) =>
      expect(httpClient.isSuccess(code)).toBe(false)
    );
  });

  test("respond - success", () => {
    const spy = jest.spyOn(console, "info");
    const response: HttpClientResponse = {
      data: [],
      status: 201,
      statusText: "OK",
      headers: {},
      config: {method: "GET", url: "api.endpoint"}
    };

    const res = httpClient.respond(response);

    expect(res).toEqual(response.data);
    expect(spy).toHaveBeenNthCalledWith(
      1,
      `[info]: ${response.status} ${
        response.statusText
      } - ${response.config.method?.toUpperCase()} ${response.config.url}`
    );

    spy.mockRestore();
  });

  test("respond - fail", () => {
    const spy = jest.spyOn(console, "error");
    const error: HttpClientError = {
      code: "400",
      message: "oh no",
      config: {method: "get", url: "api.endpoint"},
      name: "error_name",
      isAxiosError: false,
      toJSON: jest.fn()
    };

    const res = httpClient.respond(error);
    httpClient.respond(error);

    expect(res).toEqual(error);
    expect(spy).toHaveBeenNthCalledWith(
      1,
      `[error]: ${error.code} ${
        error.message
      } - ${error.config.method?.toUpperCase()} ${error.config.url}`
    );

    spy.mockRestore();
  });
});
