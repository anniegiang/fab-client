import axios from "axios";
import {MouseEventHandler, useState} from "react";
import Card from "client/components/base/Card";
import {ArtistUser} from "types/artist";
import styles from "client/styles/Artists.module.css";
import {yesNo} from "constants/common";

type Props = {
  artistUser: ArtistUser;
};

export default ({artistUser}: Props) => {
  const {id, profileImage, artist, isFollow} = artistUser;
  const {affectionateName, name, enName, statusMessage} = artist;
  const [isFollowing, setIsFollowing] = useState(isFollow === yesNo.yes);

  const _name = affectionateName ? affectionateName : `${name} * ${enName}`;

  const handleSubscribe: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    axios
      .post("/api/followArtist", {artistUserId: id})
      .then(() => setIsFollowing(true));
  };

  const handleUnsubscribe: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    axios
      .post("/api/unfollowArtist", {artistUserId: id})
      .then(() => setIsFollowing(false));
  };

  return (
    <Card key={id} linkHref={`/artist/${id}`} imageSrc={profileImage}>
      <div className={styles.content}>
        <h4 className={styles.artistName}>{_name}</h4>
        <p className={styles.artistStatus}>{statusMessage}</p>
        <button
          className={`${styles.button} ${
            isFollowing ? styles.unsubscribe : styles.subscribe
          }`}
          onClick={isFollowing ? handleUnsubscribe : handleSubscribe}
        >
          {isFollowing ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>
    </Card>
  );
};
