import axios from "axios";
import {ReactNode, useEffect, useState} from "react";
import AuthContext from "client/context/AuthContext";
import NavBar from "client/components/layout/NavBar";
import {Id, Nullable} from "types/common";
import {UserInfo} from "types/user";
import styles from "client/styles/Layout.module.css";

type Props = {
  userid: Nullable<Id>;
  accesstoken: Nullable<string>;
  children: ReactNode;
};

export default ({userid, accesstoken, children}: Props) => {
  const [user, setUser] = useState<UserInfo | undefined>();

  useEffect(() => {
    axios
      .post("/api/user", {userid, accesstoken})
      .then((response) => setUser(response.data));
  }, [userid, accesstoken]);

  if (!user) return null;

  return (
    <AuthContext.Provider value={{userid, accesstoken, loggedInUser: user}}>
      <NavBar user={user} />
      <div className={styles.container}>{children}</div>
    </AuthContext.Provider>
  );
};
