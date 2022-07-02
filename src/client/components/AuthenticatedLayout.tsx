import axios from "axios";
import {ReactNode, useEffect, useState} from "react";
import AuthContext from "Client/context/AuthContext";
import NavBar from "Components/NavBar";
import {Id, Nullable} from "Types/common";
import styles from "Client/styles/Layout.module.css";
import {UserInfo} from "Types/user";

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
