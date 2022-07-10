import Card from "client/components/base/Card";
import {Group} from "types/group";
import styles from "client/styles/Artists.module.css";
import {PATHS} from "constants/pages";

type Props = {
  group: Group;
};

export default ({group}: Props) => {
  const {id, name, enName, profileImage, statusMessage} = group;
  const _name = `${name} * ${enName}`;

  return (
    <Card key={id} linkHref={`${PATHS.group}/${id}`} imageSrc={profileImage}>
      <h4 className={styles.artistName}>{_name}</h4>
      <p className={styles.artistStatus}>{statusMessage}</p>
    </Card>
  );
};
