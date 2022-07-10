import {MouseEventHandler} from "react";
import {useRouter} from "next/router";
import {Message} from "types/message";
import {YES_NO} from "constants/common";
import styles from "client/styles/Message.module.css";
import Card from "client/components/base/Card";
import {getMessageTimestamp} from "client/utils/getMessageTimestamp";
import {PATHS} from "constants/pages";
import {POINTS} from "constants/points";

type Props = {
  message: Message;
};

export default ({message}: Props) => {
  const router = useRouter();
  const author = (
    message.isGroup === YES_NO.yes ? message.group : message.user
  )!;

  const {id, letter, postcard, createdAt, isRead} = message;

  const imageSrc = postcard?.thumbnail ?? letter?.thumbnail;
  const linkHref = `${PATHS.message}/${id}?thumbnail=${imageSrc}`;
  const isFollow = author.isFollow === YES_NO.yes;
  const isOpened = isRead === YES_NO.yes;

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!isFollow) {
      alert("Please subscribe to artist to see the message");
    } else {
      router.push(linkHref);
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
      <p className={styles.readStatus}>
        {isOpened
          ? "Opened"
          : `Not opened (costs ${POINTS.openMessage} points)`}
      </p>
    </Card>
  );
};
