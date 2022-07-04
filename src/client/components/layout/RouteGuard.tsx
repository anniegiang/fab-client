import {useState, useEffect, useContext, ReactNode} from "react";
import {useRouter} from "next/router";
import AuthContext from "client/context/AuthContext";

type Props = {
  children: ReactNode;
};

const publicPaths = ["/login"];

export default ({children}: Props) => {
  const router = useRouter();
  const {userid, accesstoken} = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(false);

  const isLoggedIn = !!(userid && accesstoken);

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url: string) {
    const path = url.split("?")[0];

    if (!isLoggedIn && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({pathname: "/login"});
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
};
