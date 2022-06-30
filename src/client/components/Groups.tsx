import Link from "next/link";
import Image from "next/image";
import {Group} from "Types/group";
import cardStyles from "Client/styles/Card.module.css";
import groupStyles from "Client/styles/Artists.module.css";

type Props = {
  groups: Group[];
};

export default ({groups}: Props) => {
  return (
    <div className={cardStyles.rootContainer}>
      {groups.map((group) => {
        const {id, name, enName, profileImage, statusMessage} = group;
        const _name = `${name} * ${enName}`;
        return (
          <Link key={id} href={`/group/${id}`}>
            <div className={cardStyles.contentContainer}>
              <Image
                className={cardStyles.image}
                src={profileImage}
                alt={_name}
                width={250}
                height={250}
              />
              <h4 className={groupStyles.artistName}>{_name}</h4>
              <p className={groupStyles.artistStatus}>{statusMessage}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
