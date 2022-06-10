import axios, {AxiosResponse} from "axios";
import {Id} from "Types/coreTypes";
import BaseController from "./BaseController";

class GroupController extends BaseController {
  constructor() {
    super();
  }

  get baseUrl(): string {
    return `${this.baseApi}/groups`;
  }

  async getGroupInfo(groupId: Id): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/${groupId}`, {
      headers: this.defaultHeaders
    });
  }
}

export default new GroupController();
