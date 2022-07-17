import axios from "axios";
import {MouseEventHandler} from "react";
import {useRouter} from "next/router";
import {Id} from "types/common";
import {withSessionSsr} from "config/withSession";
import FanLetterController from "server/controllers/FanLetterController";
import PrimaryButton from "client/components/base/PrimaryButton";
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
  const router = useRouter();

  const {title, text, createdAt, id} = fanLetter;

  const handleDeleteLetter: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (window.confirm("Delete letter?")) {
      axios
        .post("/api/deleteFanLetter", {fanLetterId: id})
        .then(() => router.back())
        .catch(() => alert("Error deleting letter"));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContent}>
        <h5>{getMessageTimestamp(createdAt)}</h5>
        <PrimaryButton text="Delete letter" onClick={handleDeleteLetter} />
      </div>
      <h3 className={styles.letterTitle}>{title}</h3>
      {text.split("\n").map((text, idx) =>
        !text ? (
          <br key={idx} />
        ) : (
          <p key={idx} className={styles.letterText}>
            {text}
          </p>
        )
      )}
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
