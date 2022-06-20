import Link from "next/link";
import Image from "next/image";
import {ArtistUser} from "Types/artist";
import styles from "Client/styles/Artists.module.css";

type Props = {
  artistUsers: ArtistUser[];
};

export default ({artistUsers}: Props) => {
  return (
    <div className={styles.container}>
      {artistUsers.map((artistUser) => {
        const {id, profileImage, artist} = artistUser;

        const name = artist.affectionateName
          ? artist.affectionateName
          : `${artist.name} * ${artist.enName}`;

        return (
          <Link href={`/artist/${id}`}>
            <div key={id} className={styles.artistContainer}>
              <Image
                className={styles.artistImage}
                src={profileImage}
                alt={name}
                width={250}
                height={250}
              />
              <div className={styles.content}>
                <h4 className={styles.artistName}>{name}</h4>
                <p className={styles.artistStatus}>{artist.statusMessage}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
