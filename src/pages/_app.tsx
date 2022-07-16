import axios from "axios";
import {useState, useEffect} from "react";
import "client/styles/App.css";
import {AppProps} from "next/app";
import {UserInfo} from "types/user";
import AuthContext from "client/context/AuthContext";
import LoadingBar from "client/components/layout/LoadingBar";
import RouteGuard from "client/components/layout/RouteGuard";
import AuthenticatedLayout from "client/components/layout/AuthenticatedLayout";
import {useAccessToken, useUserId} from "client/hooks/useLocalSession";
import environment from "config/environment";
import Environment from "constants/environment";

export default ({Component, pageProps}: AppProps) => {
  const {userId, setUserId} = useUserId();
  const {accessToken, setAccessToken} = useAccessToken();
  const [user, setUser] = useState<UserInfo | undefined>();

  useEffect(() => {
    if (userId && accessToken) {
      axios.post("/api/user").then((response) => setUser(response.data));
    }
  }, [userId, accessToken]);

  if (environment === Environment.production) {
    return <h1>Coming soon</h1>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userid: userId ? Number(userId) : null,
        accesstoken: accessToken,
        setUserId,
        setAccessToken
      }}
    >
      <LoadingBar />
      <RouteGuard>
        <AuthenticatedLayout>
          <Component {...pageProps} />
        </AuthenticatedLayout>
      </RouteGuard>
    </AuthContext.Provider>
  );
};
