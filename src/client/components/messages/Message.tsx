import {MouseEventHandler} from "react";
import {useRouter} from "next/router";
import {Message} from "types/message";
import {yesNo} from "constants/common";
import styles from "client/styles/Message.module.css";
import Card from "client/components/base/Card";
import {getMessageTimestamp} from "client/utils/getMessageTimestamp";

type Props = {
  message: Message;
};

export default ({message}: Props) => {
  const router = useRouter();
  const author = (
    message.isGroup === yesNo.yes ? message.group : message.user
  )!;

  const {id, letter, postcard, createdAt, isRead} = message;

  const linkHref = `/message/${id}`;
  const isFollow = author.isFollow === yesNo.yes;
  const isOpened = isRead === yesNo.yes;

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!isFollow) {
      alert("Please subscribe to artist to see the message");
    } else {
      router.push(linkHref);
    }
  };

  const imageSrc = postcard?.thumbnail ?? letter?.thumbnail;

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
