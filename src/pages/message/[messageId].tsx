import moment from "moment-timezone";
import MessageController from "Controllers/MessageController";
import {Message, LetterMessageResponse} from "Types/message";
import {CommentsResponse, Comment} from "Types/comment";
import {yesNo} from "Constants/common";
import styles from "Client/styles/MessageDetail.module.css";

type Props = {
  message: Message;
  comments: Comment[];
};

export default ({message, comments}: Props) => {
  return (
    <div className={styles.container}>
      <h5 className={styles.messageTimestamp}>
        {moment(message.createdAt).format("MMMM D, YYYY h:mm a")}
      </h5>
      {comments.map(({id, comment, createdAt, isArtist}: Comment) => {
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
            <p style={{...commentPositionStyles, ...commentText}}>{comment}</p>
            <p
              className={styles.commentTimestamp}
              style={{...commentPositionStyles, ...commentText}}
            >
              {moment(createdAt).format("h:mm a")}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps = async (context: {
  params: {messageId: any};
}) => {
  const {messageId} = context.params;
  const response: LetterMessageResponse =
    await MessageController.getMessageDetails(messageId);

  let done = false;
  let oldestMessageId = undefined;
  let allComments: Comment[] = [];

  while (!done) {
    const commentsResponse: CommentsResponse =
      await MessageController.getMessageComments(messageId, oldestMessageId);

    const {comments} = commentsResponse;

    if (!comments.length) {
      oldestMessageId = undefined;
      done = true;
      break;
    }

    oldestMessageId = comments[0].id;
    allComments = [...comments, ...allComments];
  }

  return {
    props: {
      message: response.message,
      comments: allComments ?? []
    }
  };
};
