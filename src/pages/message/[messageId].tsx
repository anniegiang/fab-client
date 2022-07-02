import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {withSessionSsr} from "config/withSession";
import moment from "moment-timezone";
import MessageController from "server/controllers/MessageController";
import MessageCommentForm from "client/components/MessageCommentForm";
import {Message, LetterMessageResponse} from "types/message";
import {CommentsResponse, Comment} from "types/comment";
import {Id} from "types/common";
import {yesNo} from "constants/common";
import styles from "client/styles/MessageDetail.module.css";

type Props = {
  message: Message;
  comments: Comment[];
};

type ServerSideParams = {
  messageId: Id;
};

export default ({message, comments}: Props) => {
  const [addedComments, setAddedComments] = useState<Comment[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const offsetBottom = ref.current.offsetTop + ref.current.offsetHeight;
      window.scrollTo({top: offsetBottom});
    }
  }, []);

  const handleAddComment = (comment: string) => {
    return axios
      .post("/api/addMessageComment", {messageId: message.id, comment})
      .then((response) =>
        setAddedComments([...addedComments, response.data.comment])
      );
  };

  return (
    <div className={styles.container} ref={ref}>
      <h5 className={styles.messageTimestamp}>
        {moment(message.createdAt).format("MMMM D, YYYY h:mm a")}
      </h5>
      {[...comments, ...addedComments].map(
        ({id, comment, createdAt, isArtist}: Comment) => {
          const writtenByArtist = isArtist === yesNo.yes;

          const commentPositionStyles = {
            alignSelf: writtenByArtist ? "flex-start" : "flex-end",
            backgroundColor: writtenByArtist ? "white" : "#ec53c6"
          };

          const commentText = {
            color: writtenByArtist ? "black" : "white"
          };

          return (
            <div
              className={styles.commentContainer}
              style={commentPositionStyles}
              key={id}
            >
              <p style={{...commentPositionStyles, ...commentText}}>
                {comment}
              </p>
              <p
                className={styles.commentTimestamp}
                style={{...commentPositionStyles, ...commentText}}
              >
                {moment(createdAt).format("h:mm a")}
              </p>
            </div>
          );
        }
      )}
      <MessageCommentForm handleAddComment={handleAddComment} />
    </div>
  );
};

export const getServerSideProps = withSessionSsr<Props>(async function (
  context
) {
  const {authHeaders} = context.req.session;
  const {messageId} = context.params as unknown as ServerSideParams;

  const messageDetailsResponse: LetterMessageResponse =
    await MessageController.getMessageDetails(messageId, authHeaders);

  let done = false;
  let oldestMessageId = undefined;
  let allComments: Comment[] = [];

  while (!done) {
    const commentsResponse: CommentsResponse =
      await MessageController.getMessageComments(
        authHeaders,
        messageId,
        oldestMessageId
      );

    const {comments} = commentsResponse;

    if (!comments || (comments && !comments.length)) {
      oldestMessageId = undefined;
      done = true;
      break;
    }

    if (comments && comments.length) {
      oldestMessageId = comments[0].id;
      allComments = [...comments, ...allComments];
    }
  }

  return {
    props: {
      message: messageDetailsResponse.message,
      comments: allComments
    }
  };
});
