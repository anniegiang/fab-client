import {useState} from "react";
import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import {Message} from "Types/message";
import {yesNo} from "Constants/common";
import styles from "Styles/Message.module.css";

type Props = {
  message: Message;
};

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 300;

export default ({message}: Props) => {
  const [ratio, setRatio] = useState(16 / 9);

  const {id, letter, postcard, createdAt, isRead} = message;
  const isOpened = isRead === yesNo.yes;

  return (
    <Link key={id} href={`/message/${id}`}>
      <div className={styles.message}>
        {letter && letter.thumbnail && (
          <Image
            className={styles.messageImage}
            src={letter.thumbnail}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT / ratio}
            onLoadingComplete={({naturalWidth, naturalHeight}) =>
              setRatio(naturalWidth / naturalHeight)
            }
          />
        )}
        {postcard && postcard.thumbnail && (
          <Image
            className={styles.messageImage}
            src={postcard.thumbnail}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT / ratio}
            onLoadingComplete={({naturalWidth, naturalHeight}) =>
              setRatio(naturalWidth / naturalHeight)
            }
          />
        )}
        <div className={styles.content}>
          <h5 className={styles.timestamp}>{getTimestamp(createdAt)}</h5>
          <p className={styles.readStatus}>
            {isOpened ? "Opened" : "Not opened (charge points)"}
          </p>
        </div>
      </div>
    </Link>
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
