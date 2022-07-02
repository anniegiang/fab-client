import moment from "moment-timezone";
import {Message} from "Types/message";
import {yesNo} from "Constants/common";
import styles from "Client/styles/Message.module.css";
import Card from "Components/Card";

type Props = {
  message: Message;
};

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 300;

const cardStyles = {
  maxWidth: "25%",
  margin: 10
};

export default ({message}: Props) => {
  const {id, letter, postcard, createdAt, isRead} = message;
  const isOpened = isRead === yesNo.yes;

  const content = (
    <>
      <h5 className={styles.timestamp}>{getTimestamp(createdAt)}</h5>
      <p className={styles.readStatus}>
        {isOpened ? "Opened" : "Not opened (charge points)"}
      </p>
    </>
  );

  if (postcard && postcard.thumbnail) {
    return (
      <Card
        key={id}
        linkHref={`/message/${id}`}
        imageSrc={postcard.thumbnail}
        imageHeight={IMAGE_WIDTH}
        imageWidth={IMAGE_HEIGHT}
        cardContainerStyles={cardStyles}
      >
        {content}
      </Card>
    );
  }

  if (letter && letter.thumbnail) {
    return (
      <Card
        key={id}
        linkHref={`/message/${id}`}
        imageSrc={letter.thumbnail}
        imageHeight={IMAGE_WIDTH}
        imageWidth={IMAGE_HEIGHT}
        cardContainerStyles={cardStyles}
      >
        {content}
      </Card>
    );
  }
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
