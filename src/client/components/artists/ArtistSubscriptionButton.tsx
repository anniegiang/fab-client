import axios from "axios";
import {MouseEventHandler, useState} from "react";
import styles from "client/styles/Artists.module.css";
import {Id} from "types/common";

type Props = {
  isFollowing: boolean;
  artistUserId: Id;
};

export default ({isFollowing, artistUserId}: Props) => {
  const [isFollow, setIsFollow] = useState(isFollowing);

  const handleSubscribe: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    axios
      .post("/api/followArtist", {artistUserId})
      .then(() => setIsFollow(true));
  };

  const handleUnsubscribe: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    axios
      .post("/api/unfollowArtist", {artistUserId})
      .then(() => setIsFollow(false));
  };

  return (
    <button
      className={`${styles.button} ${
        isFollow ? styles.unsubscribe : styles.subscribe
      }`}
      onClick={isFollow ? handleUnsubscribe : handleSubscribe}
    >
      {isFollow ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};
