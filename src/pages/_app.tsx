import axios from "axios";
import {useState, useEffect, useCallback} from "react";
import "client/styles/App.css";
import {AppProps} from "next/app";
import {UserInfo} from "types/user";
import LoadingBar from "client/components/layout/LoadingBar";
import RouteGuard from "client/components/layout/RouteGuard";
import AuthenticatedLayout from "client/components/layout/AuthenticatedLayout";
import {useAccessToken, useUserId} from "client/hooks/useLocalSession";
import environment from "config/environment";
import Environment from "constants/environment";
import AuthContext from "client/context/AuthContext";
import CurrentUserContext from "client/context/CurrentUserContext";

export default ({Component, pageProps}: AppProps) => {
  const {userId, setUserId} = useUserId();
  const {accessToken, setAccessToken} = useAccessToken();
  const [currentUser, setCurrentUser] = useState<UserInfo | undefined>();

  useEffect(() => {
    if (userId && accessToken) {
      axios.post("/api/user").then((response) => setCurrentUser(response.data));
    }
  }, [userId, accessToken]);

  const updatePoints = useCallback(
    (newPoints: number) => {
      if (!currentUser) return;
      setCurrentUser({...currentUser, points: newPoints < 0 ? 0 : newPoints});
    },
    [currentUser]
  );

  // if (environment === Environment.production) {
  //   return <h1>Coming soon</h1>;
  // }

  return (
    <AuthContext.Provider
      value={{
        userid: userId ? Number(userId) : null,
        accesstoken: accessToken,
        setUserId,
        setAccessToken
      }}
    >
      <LoadingBar />
      <RouteGuard>
        <CurrentUserContext.Provider
          value={{
            currentUser,
            updatePoints
          }}
        >
          <AuthenticatedLayout>
            <Component {...pageProps} />
          </AuthenticatedLayout>
        </CurrentUserContext.Provider>
      </RouteGuard>
    </AuthContext.Provider>
  );
};
