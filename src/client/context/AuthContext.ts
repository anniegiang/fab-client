import {createContext} from "react";
import {Id, Nullable} from "Types/common";
import {UserInfo} from "Types/user";

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
