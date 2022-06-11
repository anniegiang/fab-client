import moment from "moment-timezone";
import MessageController from "Controllers/MessageController";
import {Message, LetterMessageResponse} from "Types/message";
import {CommentsResponse, Comment} from "Types/comment";

type Props = {
  message: Message;
  comments: Comment[];
};

export default ({message, comments}: Props) => {
  return (
    <div>
      <h2>{moment(message.createdAt).format("MMMM D, YYYY h:mm a")}</h2>
      {comments.map((comment: Comment) => {
        return (
          <div key={comment.id}>
            <p>{moment(comment.createdAt).format("h:mm a")}</p>
            <p>{comment.comment}</p>
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
