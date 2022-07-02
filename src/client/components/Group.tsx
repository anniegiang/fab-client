import Card from "client/components/Card";
import {Group} from "types/group";
import styles from "client/styles/Artists.module.css";

type Props = {
  group: Group;
};

const cardStyles = {
  maxWidth: "15%",
  margin: 10
};

export default ({group}: Props) => {
  const {id, name, enName, profileImage, statusMessage} = group;
  const _name = `${name} * ${enName}`;

  return (
    <Card
      key={id}
      linkHref={`/group/${id}`}
      imageSrc={profileImage}
      imageHeight={250}
      imageWidth={250}
      imageName={_name}
      cardContainerStyles={cardStyles}
    >
      <h4 className={styles.artistName}>{_name}</h4>
      <p className={styles.artistStatus}>{statusMessage}</p>
    </Card>
  );
};
