import {createContext} from "react";
import {Id} from "Types/common";

export type AuthContextState = {
  userid?: Id;
  accesstoken?: string;
};

const initialState: AuthContextState = {
  userid: undefined,
  accesstoken: undefined
};

const AuthContext = createContext(initialState);

export default AuthContext;
