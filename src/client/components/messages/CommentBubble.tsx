import {MouseEvent} from "react";
import moment from "moment-timezone";
import {Id} from "types/common";
import {Comment} from "types/comment";
import {YES_NO} from "constants/common";
import styles from "client/styles/CommentBubble.module.css";

type Props = {
  comment: Comment;
  onDelete: (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    commentId: Id
  ) => unknown;
};

export default ({comment, onDelete}: Props) => {
  const {comment: commentText, createdAt, isArtist} = comment;
  const writtenByArtist = isArtist === YES_NO.yes;

  const commentStyles = writtenByArtist
    ? styles.artistComment
    : styles.userComment;

  const handleDeleteComment = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    return onDelete(e, comment.id);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.commentContainer} ${commentStyles}`}>
        <p className={commentStyles}>{commentText}</p>
        <p className={`${styles.commentTimestamp} ${commentStyles}`}>
          {moment(createdAt).format("h:mm a")}
        </p>
      </div>
      {!writtenByArtist && (
        <a className={styles.deleteComment} onClick={handleDeleteComment}>
          Delete
        </a>
      )}
    </div>
  );
};
