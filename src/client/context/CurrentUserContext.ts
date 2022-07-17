import {createContext} from "react";
import {UserInfo} from "types/user";

export type CurrentUserContext = {
  currentUser?: UserInfo;
  updatePoints?: (newPoints: number) => unknown;
};

const initialState: CurrentUserContext = {};

const CurrentUserContext = createContext(initialState);

export default CurrentUserContext;
