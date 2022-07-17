import {useContext, ReactNode} from "react";
import CurrentUserContext from "client/context/CurrentUserContext";
import NavBar from "client/components/layout/NavBar";
import styles from "client/styles/Layout.module.css";

type Props = {
  children: ReactNode;
};

export default ({children}: Props) => {
  const {currentUser} = useContext(CurrentUserContext);

  return (
    <>
      {currentUser && <NavBar user={currentUser} />}
      <main className={currentUser && styles.container}>{children}</main>
    </>
  );
};
