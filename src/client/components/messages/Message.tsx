import moment from "moment-timezone";
import {Message} from "types/message";
import {yesNo} from "constants/common";
import styles from "client/styles/Message.module.css";
import Card from "client/components/base/Card";

type Props = {
  message: Message;
};

export default ({message}: Props) => {
  const {id, letter, postcard, createdAt, isRead} = message;
  const isOpened = isRead === yesNo.yes;

  const imageSrc = postcard?.thumbnail ?? letter?.thumbnail;

  return (
    <Card key={id} linkHref={`/message/${id}`} imageSrc={imageSrc}>
      <h5 className={styles.timestamp}>{getTimestamp(createdAt)}</h5>
      <p className={styles.readStatus}>
        {isOpened ? "Opened" : "Not opened (charge points)"}
      </p>
    </Card>
  );
};

const getTimestamp = (timestamp: number) => {
  const format = "MM DD YYYY";
  const timeFormat = "h:mma";
  const today = moment().format(format);
  const yesterday = moment().subtract(1, "day").format(format);
  const ts = moment(timestamp).format(format);

  if (ts === today) {
    return `Today, ${moment(timestamp).format(timeFormat)}`;
  }

  if (ts === yesterday) {
    return `Yesterday, ${moment(timestamp).format(timeFormat)}`;
  }
  return moment(timestamp).format(`M/DD ${timeFormat}`);
};
