import {ReactNode} from "react";
import AuthContext from "Client/context/AuthContext";
import NavBar from "Components/NavBar";
import {Id, Nullable} from "Types/common";
import styles from "Client/styles/Layout.module.css";

type Props = {
  userid: Nullable<Id>;
  accesstoken: Nullable<string>;
  children: ReactNode;
};

export default ({userid, accesstoken, children}: Props) => {
  return (
    <AuthContext.Provider value={{userid, accesstoken}}>
      <NavBar />
      <div className={styles.container}>{children}</div>
    </AuthContext.Provider>
  );
};
