import NavBar from "Components/NavBar";
import axios from "axios";
import {useState, ReactNode} from "react";
import {useAccessToken, useUserId} from "Client/hooks/useLocalSession";
import LoginForm from "Client/components/LoginForm";
import {LoginFields} from "Types/session";
import AuthContext from "Client/context/AuthContext";

type Props = {
  children: ReactNode;
};

export default ({children}: Props) => {
  const {userId, setUserId} = useUserId();
  const {accessToken, setAccessToken} = useAccessToken();
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const handleSubmit = async (fields: LoginFields) => {
    return axios
      .post("/api/login", {
        userId: Number(fields.userId),
        accessToken: fields.accessToken
      })
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
    <AuthContext.Provider
      value={{userid: Number(userId), accesstoken: accessToken!}}
    >
      <NavBar />
      {children}
    </AuthContext.Provider>
  );
};
