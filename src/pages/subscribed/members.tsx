import UserController from "Controllers/UserController";
import Members from "Components/Members";
import {ArtistResponse, Member} from "Types/artist";

type Props = {
  subscribedArtists: Member[];
};

export default ({subscribedArtists}: Props) => {
  return (
    <div>
      <h1>Subscribed Members</h1>
      <Members members={subscribedArtists} />;
    </div>
  );
};

export const getServerSideProps = async () => {
  const subscribedArtistsReponse: ArtistResponse =
    await UserController.getSubscribedArtists();

  return {
    props: {
      subscribedArtists: subscribedArtistsReponse.artistUsers
    }
  };
};
