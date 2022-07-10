import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Id} from "types/common";
import {withSessionSsr} from "config/withSession";
import styles from "client/styles/MessageComments.module.css";
import MessageController from "server/controllers/MessageController";
import MessageCommentForm from "client/components/forms/MessageCommentForm";
import {CommentsResponse, Comment} from "types/comment";
import CommentBubble from "client/components/messages/CommentBubble";

type Props = {
  comments: Comment[];
};

type ServerSideParams = {
  messageId: Id;
};

export default ({comments}: Props) => {
  const router = useRouter();
  const {messageId} = router.query;

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
      .post("/api/addMessageComment", {messageId, comment})
      .then((response) =>
        setAddedComments([...addedComments, response.data.comment])
      );
  };

  return (
    <div className={styles.container} ref={ref}>
      {[...comments, ...addedComments].map((comment) => (
        <CommentBubble key={comment.id} comment={comment} />
      ))}
      <MessageCommentForm handleAddComment={handleAddComment} />
    </div>
  );
};

export const getServerSideProps = withSessionSsr<Props>(async function (
  context
) {
  const {authHeaders} = context.req.session;
  const {messageId} = context.params as unknown as ServerSideParams;

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
    props: {comments: allComments}
  };
});
