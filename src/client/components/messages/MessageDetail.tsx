import styles from "client/styles/MessageDetail.module.css";
import {Message, ParsedMessageContent, MessageContentType} from "types/message";
import Image from "client/components/base/Image";
import {ImageUrl} from "types/common";
import {getMessageTimestamp} from "client/utils/getMessageTimestamp";
import PrimaryButton from "client/components/base/PrimaryButton";
import {PATHS} from "constants/pages";
import formStyles from "client/styles/Form.module.css";

type Props = {
  message: Message;
  thumbnail?: ImageUrl;
};

export default ({message, thumbnail}: Props) => {
  const {letter, id, postcard, createdAt} = message;
  const topContent = (
    <>
      <span className={styles.commentButton}>
        <PrimaryButton
          text="Comments"
          linkHref={`${PATHS.message}/${id}/comments`}
        />
      </span>
      {thumbnail && (
        <Image src={thumbnail} className={styles.image} objectFit="contain" />
      )}
      <h4 className={styles.messageTimestamp}>
        {getMessageTimestamp(createdAt)}
      </h4>
    </>
  );

  if (postcard) {
    return (
      <div className={styles.messageContainer}>
        {topContent}
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
      {topContent}
      <section className={styles.messageContent} style={{alignItems: align}}>
        {filteredContent.map(({type, size, text, color}, idx) =>
          type === MessageContentType.Text ? (
            <p
              key={idx}
              className={styles.text}
              style={{fontSize: size, color: color}}
            >
              {text}
            </p>
          ) : (
            <span key={idx} className={styles.lineBreak}></span>
          )
        )}
      </section>
      <p className={`${formStyles.disclaimer} ${styles.pictureDisclaimer}`}>
        * Pictures in messages are blocked by FAB. View in the FAB app instead.
      </p>
    </div>
  );
};
