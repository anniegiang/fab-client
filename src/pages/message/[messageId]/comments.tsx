import {
  MouseEventHandler,
  MouseEvent,
  useEffect,
  useRef,
  useState
} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {Id} from "types/common";
import {withSessionSsr} from "config/withSession";
import styles from "client/styles/MessageComments.module.css";
import formStyles from "client/styles/Form.module.css";
import MessageController from "server/controllers/MessageController";
import MessageCommentForm from "client/components/forms/MessageCommentForm";
import {CommentsResponse, Comment} from "types/comment";
import CommentBubble from "client/components/messages/CommentBubble";
import {POINTS} from "constants/points";
import {
  exportCommentsTxt,
  exportCommentsCsv,
  recursiveComments
} from "client/utils/commentsExport";

type Props = {
  comments: Comment[];
};

type ServerSideParams = {
  messageId: Id;
};

export default ({comments}: Props) => {
  const router = useRouter();
  const {messageId} = router.query;

  const [allComments, setAllComments] = useState<Comment[]>(comments);
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
        setAllComments([...allComments, response.data.comment])
      );
  };

  const handleDeleteComment = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    commentIndex: number
  ) => {
    e.preventDefault();
    if (window.confirm("Delete comment? Points will not be redunded.")) {
      const comment = allComments[commentIndex];
      axios
        .post("/api/deleteMessageComment", {
          messageId: Number(messageId),
          commentId: comment.id
        })
        .then(() => {
          setAllComments([
            ...allComments.slice(0, commentIndex),
            ...allComments.slice(commentIndex + 1)
          ]);
        })
        .catch(() => alert("Error deleting comment"));
    }
  };

  const _allComments = recursiveComments(allComments);
  const handleExportCommentsTxt: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    exportCommentsTxt(_allComments, messageId as string);
  };

  const handleExportCommentsCSV: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    exportCommentsCsv(_allComments, messageId as string);
  };

  return (
    <div className={styles.container} ref={ref}>
      <section>
        {allComments.length ? (
          allComments.map((comment, index) => (
            <CommentBubble
              key={comment.id}
              comment={comment}
              onDelete={(e) => handleDeleteComment(e, index)}
            />
          ))
        ) : (
          <h4 className={styles.noComments}>No comments</h4>
        )}
      </section>
      <MessageCommentForm handleAddComment={handleAddComment} />
      <section className={styles.exports}>
        <a onClick={handleExportCommentsCSV}>Export comments (.csv)</a>
        <a onClick={handleExportCommentsTxt}>Export comments (.txt)</a>
      </section>
      <section>
        {[
          `* Sending comments costs ${POINTS.sendComment} point`,
          "* Your comments are sent in real time",
          "* Responses are not recieved in real time"
        ].map((text) => (
          <p key={text} className={formStyles.disclaimer}>
            {text}
          </p>
        ))}
      </section>
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
