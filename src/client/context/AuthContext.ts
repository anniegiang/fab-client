import {createContext} from "react";
import {Id, Nullable} from "Types/common";

export type AuthContextState = {
  userid: Nullable<Id>;
  accesstoken: Nullable<string>;
};

const initialState: AuthContextState = {
  userid: null,
  accesstoken: null
};

const AuthContext = createContext(initialState);

export default AuthContext;
