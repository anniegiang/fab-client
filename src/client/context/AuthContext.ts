import {createContext} from "react";
import {Id, Nullable} from "types/common";
import {UserInfo} from "types/user";

export type AuthContextState = {
  userid: Nullable<Id>;
  accesstoken: Nullable<string>;
  user?: UserInfo;
  setUserId?: (userId: string) => void;
  setAccessToken?: (accesstoken: string) => void;
};

const initialState: AuthContextState = {
  userid: null,
  accesstoken: null
};

const AuthContext = createContext(initialState);

export default AuthContext;
