import {AppProps} from "next/app";
import "client/styles/App.css";
import LoadingBar from "client/components/layout/LoadingBar";
import RouteGuard from "client/components/layout/RouteGuard";
import AuthContext from "client/context/AuthContext";
import {useAccessToken, useUserId} from "client/hooks/useLocalSession";

export default ({Component, pageProps}: AppProps) => {
  const {userId, setUserId} = useUserId();
  const {accessToken, setAccessToken} = useAccessToken();

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
        <Component {...pageProps} />
      </RouteGuard>
    </AuthContext.Provider>
  );
};
