import {Message} from "types/message";
import {yesNo} from "constants/common";
import styles from "client/styles/Message.module.css";
import Card from "client/components/base/Card";
import {getMessageTimestamp} from "client/utils/getMessageTimestamp";

type Props = {
  message: Message;
};

export default ({message}: Props) => {
  const {id, letter, postcard, createdAt, isRead} = message;
  const isOpened = isRead === yesNo.yes;

  const imageSrc = postcard?.thumbnail ?? letter?.thumbnail;

  return (
    <Card key={id} linkHref={`/message/${id}`} imageSrc={imageSrc}>
      <h5 className={styles.timestamp}>{getMessageTimestamp(createdAt)}</h5>
      <p className={styles.readStatus}>
        {isOpened ? "Opened" : "Not opened (charge points)"}
      </p>
    </Card>
  );
};
