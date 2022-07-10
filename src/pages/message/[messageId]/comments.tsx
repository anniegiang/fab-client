import moment from "moment-timezone";
import {useRouter} from "next/router";
import {MouseEventHandler, useEffect, useRef, useState} from "react";
import axios from "axios";
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

  const [addedComments, setAddedComments] = useState<Comment[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const _comments = [...comments, ...addedComments];

  useEffect(() => {
    if (ref.current) {
      const offsetBottom = ref.current.offsetTop + ref.current.offsetHeight;
      window.scrollTo({top: offsetBottom});
    }
  }, []);

  const handleExportCommentsTxt: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();

    const allComments = _comments.map(
      ({isArtist, comment, createdAt, enName}) => {
        const timestamp = moment(createdAt).format("hh:mm:ssA YYYY-MM-DD");
        const name = isArtist === YES_NO.yes ? enName : "Me";
        return `[${name} ${timestamp}]\n${comment}\n\n`;
      }
    );

    const element = document.createElement("a");
    const file = new Blob(allComments, {type: "text/plain"});

    element.href = URL.createObjectURL(file);
    element.download = `message-${messageId}-comments`;
    document.body.appendChild(element);
    element.click();
  };

  const handleExportCommentsCSV: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    const commentRows = _comments.map(
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

    // Create a blob
    const blob = new Blob([toCSVString], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);

    // Create a link to download it
    const pom = document.createElement("a");
    pom.href = url;
    pom.setAttribute("download", `message-${messageId}-comments.csv`);
    pom.click();
  };

  const handleAddComment = (comment: string) => {
    return axios
      .post("/api/addMessageComment", {messageId, comment})
      .then((response) =>
        setAddedComments([...addedComments, response.data.comment])
      );
  };

  return (
    <div className={styles.container} ref={ref}>
      {_comments.length ? (
        _comments.map((comment) => (
          <CommentBubble key={comment.id} comment={comment} />
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
