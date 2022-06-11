import {AxiosError, AxiosResponse} from "axios";
import LoggingController from "Controllers/LoggingController";

export default class ApiController extends LoggingController {
  constructor() {
    super();
  }

  respond(response: AxiosResponse | AxiosError) {
    const _response = response as AxiosResponse;

    if (this.isSuccess(_response.status)) {
      this.logSuccessReponse(_response);
      return _response.data;
    }

    this.logErrorReponse(response as AxiosError);
    return response as AxiosError;
  }

  isSuccess(status: number): boolean {
    return status === 200 || status % 200 === 1;
  }
}
