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

const IMAGE_WIDTH = 280;
const IMAGE_HEIGHT = 280;

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
            onLoadingComplete={(dims) => {
              setRatio(dims.naturalWidth / dims.naturalHeight);
            }}
          />
        )}
        {postcard && postcard.thumbnail && (
          <Image
            className={styles.messageImage}
            src={postcard.thumbnail}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT / ratio}
            onLoadingComplete={(dims) => {
              setRatio(dims.naturalWidth / dims.naturalHeight);
            }}
          />
        )}
        <div className={styles.content}>
          <h5 className={styles.timestamp}>
            {moment(createdAt).format("M/DD h:mm a")}
          </h5>
          <p className={styles.readStatus}>
            {isOpened ? "Opened" : "Not opened (charge points)"}
          </p>
        </div>
      </div>
    </Link>
  );
};
