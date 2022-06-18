import Link from "next/link";
import Image from "next/image";
import {Member} from "Types/artist";
import styles from "Styles/Members.module.css";

type Props = {
  members: Member[];
};

export default ({members}: Props) => {
  return (
    <div className={styles.container}>
      {members.map((member) => {
        const {artist} = member;

        const name = artist.affectionateName
          ? artist.affectionateName
          : `${artist.name} * ${artist.enName}`;

        return (
          <Link href={`/member/${member.id}`}>
            <div key={member.id} className={styles.memberContainer}>
              <Image
                className={styles.memberImage}
                src={member.profileImage}
                alt={name}
                width={250}
                height={250}
              />
              <div className={styles.content}>
                <h4 className={styles.memberName}>{name}</h4>
                <p className={styles.memberStatus}>{artist.statusMessage}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
