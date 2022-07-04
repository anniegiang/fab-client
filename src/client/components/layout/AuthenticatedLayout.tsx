import {useContext, ReactNode} from "react";
import AuthContext from "client/context/AuthContext";
import NavBar from "client/components/layout/NavBar";
import styles from "client/styles/Layout.module.css";

type Props = {
  children: ReactNode;
};

export default ({children}: Props) => {
  const {user} = useContext(AuthContext);
  return (
    <>
      {user && <NavBar user={user} />}
      <main className={user && styles.container}>{children}</main>
    </>
  );
};
