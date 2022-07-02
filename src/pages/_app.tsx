import {AppProps} from "next/app";
import Layout from "client/components/Layout";
import "client/styles/App.css";
import LoadingBar from "client/components/LoadingBar";

export default ({Component, pageProps}: AppProps) => {
  return (
    <Layout>
      <LoadingBar />
      <Component {...pageProps} />
    </Layout>
  );
};
