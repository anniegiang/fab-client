import {AppProps} from "next/app";
import "Styles/App.css";

export default ({Component, pageProps}: AppProps) => {
  return <Component {...pageProps} />;
};
