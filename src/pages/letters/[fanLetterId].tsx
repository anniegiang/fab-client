import {Id} from "types/common";
import {withSessionSsr} from "config/withSession";
import FanLetterController from "server/controllers/FanLetterController";
import {FanLetter, FanLetterResponse} from "types/fanLetter";
import {getMessageTimestamp} from "client/utils/getMessageTimestamp";
import styles from "client/styles/FanLetter.module.css";

type Props = {
  fanLetter: FanLetter;
};

type ServerSideParams = {
  fanLetterId: Id;
};

export default ({fanLetter}: Props) => {
  const {title, text, createdAt} = fanLetter;

  return (
    <div className={styles.container}>
      <h4 className={styles.createdAt}>{getMessageTimestamp(createdAt)}</h4>
      <h2 className={styles.letterTitle}>{title}</h2>
      <p className={styles.letterText}>{text}</p>
    </div>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({req, params}) {
    const {authHeaders} = req.session;
    const {fanLetterId} = params as unknown as ServerSideParams;

    const fanLetterResponse: FanLetterResponse =
      await FanLetterController.getFanLetter(fanLetterId, authHeaders);

    return {
      props: {
        fanLetter: fanLetterResponse.fanletter
      }
    };
  }
);
