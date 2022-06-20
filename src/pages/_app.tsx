import {AppProps} from "next/app";
import Layout from "Components/Layout";
import "Styles/App.css";

export default ({Component, pageProps}: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};
