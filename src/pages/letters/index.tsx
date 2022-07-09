import {withSessionSsr} from "config/withSession";
import FanLetterController from "server/controllers/FanLetterController";
import {FanLetter, FanLettersReponse} from "types/fanLetter";
import FanLetterItem from "client/components/fanLetters/FanLetterItem";
import styles from "client/styles/FanLetters.module.css";

type Props = {
  fanLetters: FanLetter[];
  numFanLetters: number;
};

export default ({fanLetters, numFanLetters}: Props) => {
  const hasFanLetters = numFanLetters > 0;
  return (
    <div>
      <section>
        <h1>{hasFanLetters ? "Sent" : "No sent letters"}</h1>
        {hasFanLetters && (
          <div className={styles.fanLetters}>
            {fanLetters.map((fanLetter) => (
              <FanLetterItem key={fanLetter.id} fanLetter={fanLetter} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({req}) {
    const {authHeaders} = req.session;

    const fanLettersResponse: FanLettersReponse =
      await FanLetterController.getFanLetters(authHeaders);

    return {
      props: {
        fanLetters: fanLettersResponse.fanletters,
        numFanLetters: fanLettersResponse.count
      }
    };
  }
);
