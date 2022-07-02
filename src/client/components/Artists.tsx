import Link from "next/link";
import Image from "Components/Image";
import {ArtistUser} from "Types/artist";
import cardStyles from "Client/styles/Card.module.css";
import artistStyles from "Client/styles/Artists.module.css";

type Props = {
  artistUsers: ArtistUser[];
};

export default ({artistUsers}: Props) => {
  return (
    <div className={cardStyles.rootContainer}>
      {artistUsers.map((artistUser) => {
        const {id, profileImage, artist} = artistUser;

        const name = artist.affectionateName
          ? artist.affectionateName
          : `${artist.name} * ${artist.enName}`;

        return (
          <Link key={id} href={`/artist/${id}`}>
            <div className={cardStyles.contentContainer}>
              <Image
                className={cardStyles.artistImage}
                src={profileImage}
                alt={name}
                initialwidth={250}
                initialheight={250}
              />
              <div className={cardStyles.content}>
                <h4 className={artistStyles.artistName}>{name}</h4>
                <p className={artistStyles.artistStatus}>
                  {artist.statusMessage}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
