import axios from "axios";
import {useState, useContext} from "react";
import {useRouter} from "next/router";
import LoginForm from "client/components/forms/LoginForm";
import {LoginFields} from "types/session";
import {AuthHeaders} from "types/session";
import AuthContext from "client/context/AuthContext";
import {PATHS} from "constants/pages";

export default () => {
  const router = useRouter();
  const {setUserId, setAccessToken} = useContext(AuthContext);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const handleSubmit = async (fields: LoginFields) => {
    if (setUserId && setAccessToken) {
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
            router.push({pathname: PATHS.home});
          } else {
            setIsLoginFailed(true);
          }
        })
        .catch(() => setIsLoginFailed(true));
    }
  };

  return (
    <LoginForm handleSubmit={handleSubmit} isLoginFailed={isLoginFailed} />
  );
};
