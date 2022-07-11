import {useContext, MouseEventHandler} from "react";
import {useRouter} from "next/router";
import {Message} from "types/message";
import {YES_NO} from "constants/common";
import styles from "client/styles/Message.module.css";
import Card from "client/components/base/Card";
import {getMessageTimestamp} from "client/utils/getMessageTimestamp";
import {PATHS} from "constants/pages";
import {POINTS} from "constants/points";
import AuthContext from "client/context/AuthContext";

type Props = {
  message: Message;
};

export default ({message}: Props) => {
  const {user} = useContext(AuthContext);
  const router = useRouter();
  const author = (
    message.isGroup === YES_NO.yes ? message.group : message.user
  )!;

  const {id, letter, postcard, createdAt, isRead} = message;

  const imageSrc = postcard?.thumbnail ?? letter?.thumbnail;
  const linkHref = `${PATHS.message}/${id}?thumbnail=${imageSrc}`;
  const isFollow = author.isFollow === YES_NO.yes;
  const isOpened = isRead === YES_NO.yes;
  const hasEnoughPoints = user && user.points >= POINTS.openMessage;

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
        return alert("You do not have enough points to open this message.");
      }

      if (
        hasEnoughPoints &&
        window.confirm(
          `Opening a message for the first time will cost ${POINTS.openMessage} points.`
        )
      ) {
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
      <h5 className={styles.timestamp}>{getMessageTimestamp(createdAt)}</h5>
      <p className={styles.readStatus}>{isOpened ? "Opened" : "Not opened"}</p>
    </Card>
  );
};
