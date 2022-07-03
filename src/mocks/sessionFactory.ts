import {SessionResponse} from "types/session";

export const mockSessionResponse = (
  customValues?: Partial<SessionResponse>
): SessionResponse => ({
  isAuthenticated: true,
  isError: false,
  ...customValues
});
