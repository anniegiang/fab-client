import {Notification} from "types/notification";
import Card from "client/components/base/Card";
import styles from "client/styles/Notification.module.css";
import {getMessageTimestamp} from "client/utils/getMessageTimestamp";
import {getArtistName} from "client/utils/getArtistName";
import {paths} from "constants/pages";

type Props = {
  notification: Notification;
};

export default ({notification}: Props) => {
  const {artist} = notification.artistUser;
  return (
    <Card
      linkHref={`${paths.message}/${notification.messageId}`}
      imageSrc={notification.messageThumbnailImage}
    >
      <h4 className={styles.title}>{getArtistName(artist)}</h4>
      <p className={styles.title}>
        {getMessageTimestamp(notification.createdAt)}
      </p>
    </Card>
  );
};
