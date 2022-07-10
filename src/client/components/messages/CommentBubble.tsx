import {MouseEvent} from "react";
import moment from "moment-timezone";
import {Comment} from "types/comment";
import {YES_NO} from "constants/common";
import styles from "client/styles/CommentBubble.module.css";
import {TimeValueOf} from "types/common";

type Props = {
  comment: Comment;
  onDelete: (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => unknown;
};

type _CommentProps = {
  comment: string;
  createdAt: TimeValueOf;
  isLiked: boolean;
  writtenByArtist: boolean;
  commentStyles?: string;
  onDelete?: (
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
  const hasArtistReplies = !!(!writtenByArtist && subComments.length);

  const commentStyles = writtenByArtist
    ? styles.artistComment
    : styles.userComment;

  return (
    <>
      <_Comment
        writtenByArtist={writtenByArtist}
        isLiked={isLiked}
        commentStyles={commentStyles}
        onDelete={onDelete}
        createdAt={createdAt}
        comment={commentText}
      />
      {hasArtistReplies &&
        subComments.map((subComment) => (
          <_Comment
            writtenByArtist={true}
            isLiked={false}
            commentStyles={`${styles.artistComment} ${styles.repliedComment}`}
            createdAt={subComment.createdAt}
            comment={subComment.comment}
          />
        ))}
    </>
  );
};

const _Comment = ({
  comment,
  commentStyles = "",
  createdAt,
  writtenByArtist,
  isLiked,
  onDelete
}: _CommentProps) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.commentContainer} ${commentStyles}`}>
        <p className={commentStyles}>{comment}</p>
        <p className={`${styles.commentTimestamp} ${commentStyles}`}>
          {moment(createdAt).format(TIMESTAMP_FORMAT)}
        </p>
        {isLiked && !writtenByArtist && (
          <span className={styles.likedComment}>❤️</span>
        )}
      </div>
      {!writtenByArtist && onDelete && (
        <a className={styles.deleteComment} onClick={onDelete}>
          Delete
        </a>
      )}
    </div>
  );
};
