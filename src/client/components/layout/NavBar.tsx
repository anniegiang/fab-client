import {useRouter} from "next/router";
import {UserInfo} from "types/user";
import styles from "client/styles/NavBar.module.css";
import Link from "next/link";
import LocalSession from "client/LocalSession";
import {PATHS, HIDE_BACK_BUTTON_PATHS} from "constants/pages";
import {MouseEventHandler} from "react";

export type Props = {
  user: UserInfo;
};

export default ({user}: Props) => {
  const router = useRouter();

  const handleLogout = () => {
    if (window.confirm("Log out?")) {
      LocalSession.logout();
      router.reload();
    }
  };

  const handleBackButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <nav>
      <ul className={styles.list}>
        <div>
          {!HIDE_BACK_BUTTON_PATHS.includes(router.pathname) && (
            <li className={styles.item}>
              <button
                className={`${styles.button} ${styles.backButton}`}
                onClick={handleBackButton}
              >
                Back
              </button>
            </li>
          )}

          <li className={styles.item}>
            <Link href={PATHS.home}>Home</Link>
          </li>
          <li className={styles.item}>
            <Link href={PATHS.subscribed}>Subscribed</Link>
          </li>
          <li className={styles.item}>
            <Link href={PATHS.fanLetters}>Letters</Link>
          </li>
        </div>
        <div>
          <li className={styles.item}>
            <p>{user.nickName}</p>
          </li>
          <li className={styles.item}>
            <p>Points: {user.points}</p>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={handleLogout}>
              Log out
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};
