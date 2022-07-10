import {MouseEvent} from "react";
import moment from "moment-timezone";
import {Comment} from "types/comment";
import {YES_NO} from "constants/common";
import styles from "client/styles/CommentBubble.module.css";

type Props = {
  comment: Comment;
  onDelete: (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => unknown;
};

const TIMESTAMP_FORMAT = "h:mm a";
export default ({comment, onDelete}: Props) => {
  const {
    comment: commentText,
    createdAt,
    isArtist,
    isLike,
    subComments
  } = comment;
  const writtenByArtist = isArtist === YES_NO.yes;
  const isLiked = isLike === YES_NO.yes;
  const hasReplies = !!(subComments.length && !writtenByArtist);

  const commentStyles = writtenByArtist
    ? styles.artistComment
    : styles.userComment;

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.commentContainer} ${commentStyles}`}>
          <p className={commentStyles}>{commentText}</p>
          <p className={`${styles.commentTimestamp} ${commentStyles}`}>
            {moment(createdAt).format(TIMESTAMP_FORMAT)}
          </p>
          {isLiked && !writtenByArtist && (
            <span className={styles.likedComment}>❤️</span>
          )}
        </div>
        {!writtenByArtist && (
          <a className={styles.deleteComment} onClick={onDelete}>
            Delete
          </a>
        )}
      </div>
      {hasReplies &&
        subComments.map((subComment) => (
          <div className={styles.container}>
            <div
              className={`${styles.commentContainer} ${styles.artistComment} ${styles.repliedComment}`}
            >
              <p className={`${styles.artistComment} ${styles.repliedComment}`}>
                {subComment.comment}
              </p>
              <p
                className={`${styles.commentTimestamp} ${styles.artistComment} ${styles.repliedComment}`}
              >
                {moment(subComment.createdAt).format(TIMESTAMP_FORMAT)}
              </p>
            </div>
          </div>
        ))}
    </>
  );
};
