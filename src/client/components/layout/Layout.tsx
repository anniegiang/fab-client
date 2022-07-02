import axios from "axios";
import {useState, ReactNode} from "react";
import {useAccessToken, useUserId} from "client/hooks/useLocalSession";
import AuthenticatedLayout from "client/components/layout/AuthenticatedLayout";
import LoginForm from "client/components/forms/LoginForm";
import {LoginFields} from "types/session";
import {AuthHeaders} from "types/session";

type Props = {
  children: ReactNode;
};

export default ({children}: Props) => {
  const {userId, setUserId} = useUserId();
  const {accessToken, setAccessToken} = useAccessToken();
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const handleSubmit = async (fields: LoginFields) => {
    const requestBody: AuthHeaders = {
      userid: Number(fields.userId),
      accesstoken: fields.accessToken
    };

    return axios
      .post("/api/login", requestBody)
      .then((response) => {
        if (response.data.isAuthenticated) {
          setUserId(fields.userId);
          setAccessToken(fields.accessToken);
          setIsLoginFailed(false);
        } else {
          setIsLoginFailed(true);
        }
      })
      .catch(() => setIsLoginFailed(true));
  };

  if (!userId && !accessToken) {
    return (
      <LoginForm handleSubmit={handleSubmit} isLoginFailed={isLoginFailed} />
    );
  }

  return (
    <AuthenticatedLayout userid={Number(userId)} accesstoken={accessToken}>
      {children}
    </AuthenticatedLayout>
  );
};
