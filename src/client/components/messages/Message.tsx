import {useContext, MouseEventHandler} from "react";
import {useRouter} from "next/router";
import {Message} from "types/message";
import {YES_NO} from "constants/common";
import styles from "client/styles/Message.module.css";
import Card from "client/components/base/Card";
import {getMessageTimestamp} from "client/utils/getMessageTimestamp";
import {getArtistName} from "client/utils/getArtistName";
import {PATHS} from "constants/pages";
import {POINTS} from "constants/points";
import CurrentUserContext from "client/context/CurrentUserContext";

type Props = {
  message: Message;
};

export default ({message}: Props) => {
  const {currentUser, updatePoints} = useContext(CurrentUserContext);

  const router = useRouter();
  const {
    id,
    letter,
    postcard,
    createdAt,
    isRead,
    user: userArtist,
    group
  } = message;

  const isGroup = message.isGroup === YES_NO.yes;
  const author = (isGroup ? group : userArtist)!;

  const imageSrc = postcard?.thumbnail ?? letter?.thumbnail;
  const linkHref = `${PATHS.message}/${id}?thumbnail=${imageSrc}`;
  const isFollow = author.isFollow === YES_NO.yes;
  const isOpened = isRead === YES_NO.yes;
  const hasEnoughPoints =
    currentUser && currentUser.points >= POINTS.openMessage;

  const readStyle = !isOpened && styles.unreadText;

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if (isFollow && isOpened) {
      router.push(linkHref);
    }

    if (!isFollow) {
      return alert("Please subscribe to artist to see the message.");
    }

    if (!isOpened) {
      if (!hasEnoughPoints) {
        return alert(
          `You do not have enough points to open this message (${POINTS.openMessage} points).`
        );
      }

      if (
        hasEnoughPoints &&
        window.confirm(
          `Opening a message for the first time will cost ${POINTS.openMessage} points. Open?`
        )
      ) {
        updatePoints && updatePoints(currentUser.points - POINTS.openMessage);
        router.push(linkHref);
      }
      return;
    }
  };

  return (
    <Card
      key={id}
      linkHref={linkHref}
      onClick={handleClick}
      imageSrc={imageSrc}
    >
      <p className={`${styles.text} ${readStyle}`}>
        {userArtist
          ? getArtistName(userArtist.artist)
          : group && `${group.name} * ${group.enName}`}
      </p>
      <p className={`${styles.timestamp} ${readStyle}`}>
        {getMessageTimestamp(createdAt)}
      </p>
    </Card>
  );
};
