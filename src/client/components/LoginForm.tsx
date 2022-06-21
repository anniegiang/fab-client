import React, {
  useState,
  FormEvent,
  ChangeEventHandler,
  ChangeEvent
} from "react";
import {LoginFields} from "Types/session";
import styles from "Client/styles/LoginForm.module.css";

type Props = {
  isLoginFailed: boolean;
  handleSubmit: (e: FormEvent, fields: LoginFields) => any;
};

const MINIMUM_USER_ID_LENGTH = 1;
const MINIMUM_ACCESS_TOKEN_LENGTH = 10;

export default ({handleSubmit, isLoginFailed}: Props) => {
  const [userId, setUserId] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");

  const onSubmit = (e: FormEvent) => handleSubmit(e, {userId, accessToken});

  const handlUserIdChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => setUserId(e.target.value);

  const handleAccessTokenChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => setAccessToken(e.target.value);

  const isSubmitButtonDisabled =
    !userId ||
    !accessToken ||
    userId.length < MINIMUM_USER_ID_LENGTH ||
    accessToken.length < MINIMUM_ACCESS_TOKEN_LENGTH;

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={onSubmit}>
        <h2 className={styles.title}>Login</h2>
        <label className={styles.label}>
          <h3>Fab User Id (numbers only)</h3>
          <input
            type="number"
            value={userId}
            onChange={handlUserIdChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          <h3>Fab Access Token</h3>
          <textarea
            value={accessToken}
            onChange={handleAccessTokenChange}
            className={styles.input}
            rows={7}
            cols={35}
          />
        </label>
        <input
          className={styles.submitButton}
          disabled={isSubmitButtonDisabled}
          type="submit"
          value="Login"
        />
        {isLoginFailed && (
          <h3 className={styles.errorMessage}>
            Unable to login. Please try again.
          </h3>
        )}
      </form>
    </div>
  );
};
