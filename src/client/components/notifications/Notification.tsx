import {Notification} from "types/notification";
import Card from "client/components/base/Card";
import styles from "client/styles/Notification.module.css";
import {getMessageTimestamp} from "client/utils/getMessageTimestamp";
import {getArtistName} from "client/utils/getArtistName";
import {PATHS} from "constants/pages";

type Props = {
  notification: Notification;
};

export default ({notification}: Props) => {
  const {artistUser, messageId, messageThumbnailImage, createdAt} =
    notification;
  const {artist} = artistUser;

  return (
    <Card
      linkHref={`${PATHS.message}/${messageId}/comments`}
      imageSrc={messageThumbnailImage}
    >
      <h4 className={styles.title}>{getArtistName(artist)}</h4>
      <p className={styles.title}>{getMessageTimestamp(createdAt)}</p>
    </Card>
  );
};
