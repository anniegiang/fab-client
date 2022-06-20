import UserController from "Controllers/UserController";
import Members from "Components/Members";
import Groups from "Components/Groups";
import {ArtistResponse, Member} from "Types/artist";
import {SubscribedGroupsResponse, Group} from "Types/groups";

type Props = {
  subscribedArtists: Member[];
  subscribedGroups: Group[];
};

export default ({subscribedArtists, subscribedGroups}: Props) => {
  return (
    <div>
      <h1>Subscribed Members</h1>
      <Members members={subscribedArtists} />
      <h1>Subscribed Groups</h1>
      <Groups groups={subscribedGroups} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const subscribedGroupsReponse: SubscribedGroupsResponse =
    await UserController.getSubscribedGroups();
  const subscribedArtistsReponse: ArtistResponse =
    await UserController.getSubscribedArtists();

  return {
    props: {
      subscribedArtists: subscribedArtistsReponse.artistUsers,
      subscribedGroups: subscribedGroupsReponse.groups
    }
  };
};
