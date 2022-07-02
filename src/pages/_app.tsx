import {AppProps} from "next/app";
import Layout from "Components/Layout";
import "Client/styles/App.css";
import LoadingBar from "Components/LoadingBar";

export default ({Component, pageProps}: AppProps) => {
  return (
    <Layout>
      <LoadingBar />
      <Component {...pageProps} />
    </Layout>
  );
};
