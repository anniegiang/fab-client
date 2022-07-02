import {ArtistUser} from "Types/artist";
import cardStyles from "Client/styles/Card.module.css";
import Artist from "Components/Artist";

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
