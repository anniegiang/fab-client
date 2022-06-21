import axios from "axios";
import {useState, useEffect, useContext} from "react";
import {UserInfo} from "Types/user";
import styles from "Client/styles/NavBar.module.css";
import Link from "next/link";
import AuthContext from "Client/context/AuthContext";
import LocalSession from "Client/LocalSession";

export default () => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState<UserInfo | undefined>();

  useEffect(() => {
    axios
      .post("/api/user", authContext)
      .then((response) => setUser(response.data));
  }, []);

  const handleLogout = () => LocalSession.logout();

  const name = user?.nickName ?? user?.id;
  return (
    <nav>
      <ul className={styles.list}>
        <div>
          <li className={styles.item}>
            <Link href="/">Home</Link>
          </li>
        </div>
        <div>
          {!!name && (
            <li className={styles.item}>
              <p>{name}</p>
            </li>
          )}
          {user?.points && (
            <li className={styles.item}>
              <p>Points: {user?.points}</p>
            </li>
          )}
          <li className={styles.item}>
            <button onClick={handleLogout}>Log out</button>
          </li>
        </div>
      </ul>
    </nav>
  );
};
