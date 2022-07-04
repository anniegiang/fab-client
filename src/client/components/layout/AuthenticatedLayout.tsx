import {ReactNode} from "react";
import AuthContext from "client/context/AuthContext";
import NavBar from "client/components/layout/NavBar";
import {Id, Nullable} from "types/common";
import {UserInfo} from "types/user";
import styles from "client/styles/Layout.module.css";

type Props = {
  userid: Nullable<Id>;
  accesstoken: Nullable<string>;
  user?: UserInfo;
  children: ReactNode;
};

export default ({userid, accesstoken, user, children}: Props) => {
  return (
    <AuthContext.Provider value={{userid, accesstoken, user}}>
      {user && <NavBar user={user} />}
      <div className={styles.container}>{children}</div>
    </AuthContext.Provider>
  );
};
