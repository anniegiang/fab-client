import {AuthHeaders} from "types/session";
import api from "config/api";

export const DEFAULT_BASE_API = `https://${api.host}/${api.hostDomain}/${api.apiVersion}`;

export const mockAuthHeaders = (
  customValues?: Partial<AuthHeaders>
): AuthHeaders => ({
  userid: 25,
  accesstoken: "some_valid_accesstoken",
  ...customValues
});
