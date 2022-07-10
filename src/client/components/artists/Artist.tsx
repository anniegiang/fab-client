import Card from "client/components/base/Card";
import {ArtistUser} from "types/artist";
import styles from "client/styles/Artists.module.css";
import {YES_NO} from "constants/common";
import {getArtistName} from "client/utils/getArtistName";
import ArtistSubscriptionButton from "client/components/artists/ArtistSubscriptionButton";
import {PATHS} from "constants/pages";

type Props = {
  artistUser: ArtistUser;
};

export default ({artistUser}: Props) => {
  const {id, profileImage, artist, isFollow} = artistUser;
  const {statusMessage} = artist;

  return (
    <Card key={id} linkHref={`${PATHS.artist}/${id}`} imageSrc={profileImage}>
      <div className={styles.content}>
        <h4 className={styles.artistName}>{getArtistName(artist)}</h4>
        <p className={styles.artistStatus}>{statusMessage}</p>
        <ArtistSubscriptionButton
          isFollowing={isFollow === YES_NO.yes}
          artistUserId={id}
        />
      </div>
    </Card>
  );
};
