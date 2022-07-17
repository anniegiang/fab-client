import {createContext} from "react";
import {Id, Nullable} from "types/common";

export type AuthContextState = {
  userid: Nullable<Id>;
  accesstoken: Nullable<string>;
  setUserId?: (userId: string) => void;
  setAccessToken?: (accesstoken: string) => void;
};

const initialState: AuthContextState = {
  userid: null,
  accesstoken: null
};

const AuthContext = createContext(initialState);

export default AuthContext;
