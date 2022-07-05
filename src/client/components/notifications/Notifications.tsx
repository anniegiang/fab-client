import Notification from "client/components/notifications/Notification";
import {Notification as NotificationType} from "types/notification";
import styles from "client/styles/Notifications.module.css";

type Props = {
  notifications: NotificationType[];
};

export default ({notifications}: Props) => {
  return (
    <div className={styles.container}>
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};
