import styles from "client/styles/MessageDetail.module.css";
import {Message, ParsedMessageContent, MessageContentType} from "types/message";
import Image from "client/components/base/Image";
import {ImageUrl} from "types/common";
import {getMessageTimestamp} from "client/utils/getMessageTimestamp";
import PrimaryButton from "client/components/base/PrimaryButton";
import {paths} from "constants/pages";

type Props = {
  message: Message;
  thumbnail?: ImageUrl;
};

export default ({message, thumbnail}: Props) => {
  const {letter, id, postcard, createdAt} = message;

  const timestamp = (
    <h4 className={styles.messageTimestamp}>
      {getMessageTimestamp(createdAt)}
    </h4>
  );

  if (postcard) {
    return (
      <div className={styles.messageContainer}>
        {thumbnail && <Image src={thumbnail} className={styles.image} />}
        {timestamp}
        <p className={styles.videoDisclaimer}>
          Videos are blocked by FAB. View in the FAB app instead.
        </p>
      </div>
    );
  }

  if (!letter) return null;

  const {text} = letter;

  const {contents, align}: ParsedMessageContent = JSON.parse(text);

  const filteredContent = contents.filter(
    (content) => content.type !== MessageContentType.Image
  );

  return (
    <div className={styles.messageContainer}>
      <span className={styles.commentButton}>
        <PrimaryButton
          text="Comments"
          linkHref={`${paths.message}/${id}/comments`}
        />
      </span>
      {thumbnail && <Image src={thumbnail} className={styles.image} />}
      {timestamp}
      <section className={styles.messageContent} style={{alignItems: align}}>
        {filteredContent.map(({type, size, text, color}) =>
          type === MessageContentType.Text ? (
            <p
              className={styles.text}
              style={{fontSize: size + 3, color: color}}
            >
              {text}
            </p>
          ) : (
            <span className={styles.lineBreak}></span>
          )
        )}
      </section>
    </div>
  );
};
