import {Notification} from "types/notification";
import Card from "client/components/base/Card";
import messageStyles from "client/styles/Message.module.css";
import {getMessageTimestamp} from "client/utils/getMessageTimestamp";
import {getArtistName} from "client/utils/getArtistName";
import {PATHS} from "constants/pages";
import {ZERO_ONE} from "constants/common";

type Props = {
  notification: Notification;
};

export default ({notification}: Props) => {
  const {artistUser, messageId, messageThumbnailImage, createdAt, isRead} =
    notification;

  const isOpened = isRead === ZERO_ONE.one;
  const {artist} = artistUser;

  const readStyle = !isOpened && messageStyles.unreadText;

  return (
    <Card
      linkHref={`${PATHS.message}/${messageId}/comments`}
      imageSrc={messageThumbnailImage}
    >
      <p className={`${messageStyles.text} ${readStyle}`}>
        {getArtistName(artist)}
      </p>
      <p className={`${messageStyles.timestamp} ${readStyle}`}>
        {getMessageTimestamp(createdAt)}
      </p>
    </Card>
  );
};
