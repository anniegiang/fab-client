import axios from "axios";
import BaseController from "server/controllers/BaseController";
import {DEFAULT_BASE_API} from "../../../mocks/authHeadersFactory";

const host = "vip-fab-api.myfab.tv";
const os = "ios";
const userAgent = "fab|ios|appstore|1.2.0|15.5|iPhone11,8|apple|en|US";

const baseApi = DEFAULT_BASE_API;

const defaultHeaders = {
  Host: host,
  os,
  "User-Agent": userAgent,
  Accept: "*/*",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br"
};

describe("BaseController", () => {
  const instance = new BaseController();

  test("baseApi returns correctly", () => {
    expect(instance.baseApi).toBe(baseApi);
  });

  test("defaultHeaders returns correctly", () => {
    expect(instance.defaultHeaders).toStrictEqual(defaultHeaders);
  });

  test("api - initializes a http client", () => {
    const spy = jest.spyOn(axios, "create");

    expect(typeof instance.api).toBe("function");
    expect(spy).toHaveBeenNthCalledWith(1, {
      headers: defaultHeaders,
      baseURL: baseApi,
      timeout: 2000
    });
  });
});
