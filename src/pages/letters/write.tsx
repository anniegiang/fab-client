import {
  useState,
  useContext,
  ChangeEventHandler,
  FormEventHandler
} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import styles from "client/styles/Form.module.css";
import {POINTS} from "constants/points";
import AuthContext from "client/context/AuthContext";

const MINIMUM_COMMENT_LENGTH = 1;

export default () => {
  const router = useRouter();
  const {artistUserId} = router.query;
  const {user} = useContext(AuthContext);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const hasEnoughPoints = user && user.points >= POINTS.sendLetter;

  const handleTitleOnChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.target.value);

  const handleTextOnChange: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setText(e.target.value);

  const handleSend: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!hasEnoughPoints) {
      return alert("You do not have enough points to send a letter.");
    }
    setSubmitting(true);
    axios
      .post("/api/sendFanLetter", {
        title,
        text,
        artistUserId: Number(artistUserId)
      })
      .then(() => {
        setTitle("");
        setText("");
      })
      .catch(() => alert("Error sending letter"))
      .finally(() => setSubmitting(false));
  };

  const isSendButtonDisabled =
    title.length < MINIMUM_COMMENT_LENGTH ||
    text.length < MINIMUM_COMMENT_LENGTH ||
    submitting;

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSend}>
        <label className={styles.label}>
          <input
            placeholder="Title"
            value={title}
            onChange={handleTitleOnChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          <textarea
            value={text}
            onChange={handleTextOnChange}
            className={styles.input}
            rows={25}
            cols={60}
          />
        </label>
        <input
          type="submit"
          value={submitting ? "Sending..." : "Send"}
          disabled={isSendButtonDisabled}
          className={styles.submitButton}
        />
      </form>
      {[`* Sending a letter costs ${POINTS.sendLetter} points`].map((text) => (
        <p key={text} className={styles.disclaimer}>
          {text}
        </p>
      ))}
    </div>
  );
};
