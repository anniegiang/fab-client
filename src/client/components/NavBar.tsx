import axios from "axios";
import {useState, useEffect} from "react";
import {UserInfo} from "Types/user";
import styles from "Styles/NavBar.module.css";
import Link from "next/link";

export default () => {
  const [user, setUser] = useState<UserInfo | undefined>();

  useEffect(() => {
    axios.get("/api/user").then((response) => setUser(response.data));
  }, []);

  const name = user?.nickName ?? user?.id;
  return (
    <nav>
      <ul className={styles.list}>
        <div>
          <li className={styles.item}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link href="/subscribed/members">Subscribed Members</Link>
          </li>
          <li className={styles.item}>
            <Link href="/subscribed/groups">Subscribed Groups</Link>
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
        </div>
      </ul>
    </nav>
  );
};
