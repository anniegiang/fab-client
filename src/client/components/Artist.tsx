import Card from "Components/Card";
import {ArtistUser} from "Types/artist";
import artistStyles from "Client/styles/Artists.module.css";

type Props = {
  artistUser: ArtistUser;
};

const cardStyles = {
  maxWidth: "15%",
  margin: 10
};

export default ({artistUser}: Props) => {
  const {id, profileImage, artist} = artistUser;
  const {affectionateName, name, enName, statusMessage} = artist;

  const _name = affectionateName ? affectionateName : `${name} * ${enName}`;

  return (
    <Card
      key={id}
      linkHref={`/artist/${id}`}
      imageSrc={profileImage}
      imageName={_name}
      imageHeight={250}
      imageWidth={250}
      cardContainerStyles={cardStyles}
    >
      <h4 className={artistStyles.artistName}>{name}</h4>
      <p className={artistStyles.artistStatus}>{statusMessage}</p>
    </Card>
  );
};
