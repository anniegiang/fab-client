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
      {thumbnail && <Image src={thumbnail} objectFit="contain" />}
      <h4 className={styles.messageTimestamp}>
        {getMessageTimestamp(createdAt)}
      </h4>
    </>
  );

  const disclaimer = (
    <p className={`${formStyles.disclaimer} ${styles.disclaimer}`}>
      {`* ${postcard ? "Videos" : "Pictures"} are blocked by FAB.`}
    </p>
  );

  if (postcard) {
    return (
      <div className={styles.messageContainer}>
        {topContent}
        {disclaimer}
      </div>
    );
  }

  if (!letter) return null;

  const {contents, align}: ParsedMessageContent = JSON.parse(letter.text);

  return (
    <div className={styles.messageContainer}>
      {topContent}
      <section className={styles.messageContent} style={{alignItems: align}}>
        {contents
          .filter((content) => content.type !== MessageContentType.Image)
          .map(({type, size, text, color}, idx) =>
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
      {disclaimer}
    </div>
  );
};
