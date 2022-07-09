import {FanLetter} from "types/fanLetter";
import Card from "client/components/base/Card";
import {getArtistName} from "client/utils/getArtistName";
import {getMessageTimestamp} from "client/utils/getMessageTimestamp";
import {shortenTextAddEllipses} from "client/utils/shortenTextAddEllipses";
import styles from "client/styles/FanLetterItem.module.css";
import {paths} from "constants/pages";

type Props = {
  fanLetter: FanLetter;
};

const TITLE_MAX_LENGTH = 25;
const TEXT_MAX_LENGTH = 50;

export default ({fanLetter}: Props) => {
  const {artistUser, createdAt, text, title, id} = fanLetter;

  if (!artistUser) return null;

  const {profileImage, artist} = artistUser;

  return (
    <Card linkHref={`${paths.fanLetters}/${id}`} imageSrc={profileImage}>
      <div className={styles.topContent}>
        <h4>{getArtistName(artist)}</h4>
        <h5>{getMessageTimestamp(createdAt)}</h5>
      </div>
      <h3 className={styles.letterTitle}>
        {shortenTextAddEllipses(title, TITLE_MAX_LENGTH)}
      </h3>
      <p>{shortenTextAddEllipses(text, TEXT_MAX_LENGTH)}</p>
    </Card>
  );
};
