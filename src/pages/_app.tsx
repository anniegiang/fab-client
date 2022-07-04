import axios from "axios";
import {useState, useEffect} from "react";
import {AppProps} from "next/app";
import "client/styles/App.css";
import LoadingBar from "client/components/layout/LoadingBar";
import RouteGuard from "client/components/layout/RouteGuard";
import AuthenticatedLayout from "client/components/layout/AuthenticatedLayout";
import AuthContext from "client/context/AuthContext";
import {UserInfo} from "types/user";
import {useAccessToken, useUserId} from "client/hooks/useLocalSession";

export default ({Component, pageProps}: AppProps) => {
  const {userId, setUserId} = useUserId();
  const {accessToken, setAccessToken} = useAccessToken();
  const [_, setUser] = useState<UserInfo | undefined>();

  useEffect(() => {
    if (userId && accessToken) {
      axios.post("/api/user").then((response) => setUser(response.data));
    }
  }, [userId, accessToken]);

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
        <AuthenticatedLayout>
          <Component {...pageProps} />
        </AuthenticatedLayout>
      </RouteGuard>
    </AuthContext.Provider>
  );
};
