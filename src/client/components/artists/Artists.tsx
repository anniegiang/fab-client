import {ArtistUser} from "types/artist";
import cardStyles from "client/styles/Card.module.css";
import Artist from "client/components/artists/Artist";

type Props = {
  artistUsers: ArtistUser[];
};

export default ({artistUsers}: Props) => {
  return (
    <div className={cardStyles.rootContainer}>
      {artistUsers.map((artistUser) => (
        <Artist key={artistUser.id} artistUser={artistUser} />
      ))}
    </div>
  );
};
