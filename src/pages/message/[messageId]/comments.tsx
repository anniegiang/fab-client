import {
  MouseEventHandler,
  MouseEvent,
  useEffect,
  useRef,
  useState
} from "react";
import axios from "axios";
import moment from "moment-timezone";
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
import {YES_NO} from "constants/common";

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

  const handleExportCommentsTxt: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();

    const _allComments = allComments.map(
      ({isArtist, comment, createdAt, enName}) => {
        const timestamp = moment(createdAt).format("hh:mm:ssA YYYY-MM-DD");
        const name = isArtist === YES_NO.yes ? enName : "Me";
        return `[${name} ${timestamp}]\n${comment}\n\n`;
      }
    );

    const element = document.createElement("a");
    const file = new Blob(_allComments, {type: "text/plain"});

    element.href = URL.createObjectURL(file);
    element.download = `message-${messageId}-comments`;
    document.body.appendChild(element);
    element.click();
  };

  const handleExportCommentsCSV: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    const commentRows = allComments.map(
      ({isArtist, comment, createdAt, enName}) => {
        const timestamp = moment(createdAt).format("hh:mm:ssA YYYY-MM-DD");
        const name = isArtist === YES_NO.yes ? enName : "Me";
        return [timestamp, name, comment];
      }
    );

    const toCSVString = commentRows
      .map(
        (row) =>
          row
            .map(String) // convert every value to String

            // eslint-disable-next-line quotes
            .map((v) => v.replaceAll('"', '""')) // escape double colons
            .map((v) => `"${v}"`) // quote it
            .join(",") // comma-separated
      )
      .join("\r\n"); // rows starting on new lines

    const blob = new Blob([toCSVString], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);

    const anchorTag = document.createElement("a");
    anchorTag.href = url;
    anchorTag.setAttribute("download", `message-${messageId}-comments.csv`);
    anchorTag.click();
  };

  const handleAddComment = (comment: string) => {
    return axios
      .post("/api/addMessageComment", {messageId, comment})
      .then((response) => setAllComments([...comments, response.data.comment]));
  };

  return (
    <div className={styles.container} ref={ref}>
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
      <MessageCommentForm handleAddComment={handleAddComment} />
      <section className={styles.exports}>
        <a onClick={handleExportCommentsCSV}>Export comments (.csv)</a>
        <a onClick={handleExportCommentsTxt}>Export comments (.txt)</a>
      </section>
      {[
        `* Sending comments costs ${POINTS.sendComment} point`,
        "* Your comments are sent in real time",
        "* Responses are not recieved in real time"
      ].map((text) => (
        <p key={text} className={formStyles.disclaimer}>
          {text}
        </p>
      ))}
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
