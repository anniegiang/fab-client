import {withSessionSsr} from "Config/withSession";
import moment from "moment-timezone";
import MessageController from "Controllers/MessageController";
import {Message, LetterMessageResponse} from "Types/message";
import {CommentsResponse, Comment} from "Types/comment";
import {Id} from "Types/common";
import {yesNo} from "Constants/common";
import styles from "Client/styles/MessageDetail.module.css";

type Props = {
  message: Message;
  comments: Comment[];
};

type ServerSideParams = {
  messageId: Id;
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
