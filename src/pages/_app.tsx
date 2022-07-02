import {AppProps} from "next/app";
import Layout from "client/components/layout/Layout";
import "client/styles/App.css";
import LoadingBar from "client/components/layout/LoadingBar";

export default ({Component, pageProps}: AppProps) => {
  return (
    <Layout>
      <LoadingBar />
      <Component {...pageProps} />
    </Layout>
  );
};
