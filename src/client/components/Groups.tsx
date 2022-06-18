import Link from "next/link";
import Image from "next/image";
import {Group} from "Types/groups";
import styles from "Styles/Members.module.css";

type Props = {
  groups: Group[];
};

export default ({groups}: Props) => {
  return (
    <div className={styles.container}>
      {groups.map((group) => {
        const {id, name, enName, profileImage, statusMessage} = group;
        const _name = `${name} * ${enName}`;
        return (
          <Link href={`/group/${id}`}>
            <div key={id} className={styles.memberContainer}>
              <Image
                className={styles.memberImage}
                src={profileImage}
                alt={_name}
                width={250}
                height={250}
              />
              <h4 className={styles.memberName}>{_name}</h4>
              <p className={styles.memberStatus}>{statusMessage}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
