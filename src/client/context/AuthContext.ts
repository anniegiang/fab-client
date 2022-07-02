import {createContext} from "react";
import {Id, Nullable} from "types/common";
import {UserInfo} from "types/user";

export type AuthContextState = {
  userid: Nullable<Id>;
  accesstoken: Nullable<string>;
  loggedInUser?: UserInfo;
};

const initialState: AuthContextState = {
  userid: null,
  accesstoken: null,
  loggedInUser: undefined
};

const AuthContext = createContext(initialState);

export default AuthContext;
