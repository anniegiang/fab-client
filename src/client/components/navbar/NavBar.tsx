import {UserInfo} from "Types/user";
import styles from "Styles/NavBar.module.css";
import Link from "next/link";

type Props = {
  user: UserInfo;
};

export default ({user}: Props) => {
  const name = user.nickName ?? user.id;
  return (
    <nav>
      <ul className={styles.list}>
        <div>
          <li className={styles.item}>
            <p>Points: {user.points}</p>
          </li>
          <li className={styles.item}>
            <p>{name}</p>
          </li>
        </div>
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
      </ul>
    </nav>
  );
};
