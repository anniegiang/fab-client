import React, {
  useState,
  FormEvent,
  ChangeEventHandler,
  ChangeEvent
} from "react";
import styles from "client/styles/LoginForm.module.css";

type Props = {
  handleAddComment: (comment: string) => Promise<any>;
};

const MINIMUM_COMMENT_LENGTH = 1;

export default ({handleAddComment}: Props) => {
  const [comment, setComment] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    handleAddComment(comment)
      .then(() => setComment(""))
      .finally(() => setSubmitting(false));
  };

  const handleCommentChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => setComment(e.target.value);

  const isSubmitButtonDisabled =
    !comment || comment.length < MINIMUM_COMMENT_LENGTH || submitting;

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={onSubmit}>
        <label className={styles.label}>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className={styles.input}
            rows={7}
            cols={35}
          />
        </label>
        <input
          className={styles.submitButton}
          disabled={isSubmitButtonDisabled}
          type="submit"
          value={submitting ? "Sending..." : "Send"}
        />
      </form>
    </div>
  );
};
