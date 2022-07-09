import moment from "moment-timezone";
import {Comment} from "types/comment";
import {yesNo} from "constants/common";
import styles from "client/styles/CommentBubble.module.css";

type Props = {
  comment: Comment;
};

export default ({comment}: Props) => {
  const {id, comment: commentText, createdAt, isArtist} = comment;
  const writtenByArtist = isArtist === yesNo.yes;

  const commentStyles = writtenByArtist
    ? styles.artistComment
    : styles.userComment;

  return (
    <div className={`${styles.commentContainer} ${commentStyles}`} key={id}>
      <p className={commentStyles}>{commentText}</p>
      <p className={`${styles.commentTimestamp} ${commentStyles}`}>
        {moment(createdAt).format("h:mm a")}
      </p>
    </div>
  );
};
