import {withSessionSsr} from "Config/withSession";
import UserController from "Controllers/UserController";
import Artists from "Components/Artists";
import Groups from "Components/Groups";
import {ArtistResponse, ArtistUser} from "Types/artist";
import {SubscribedGroupsResponse, Group} from "Types/group";

type Props = {
  subscribedArtists: ArtistUser[];
  subscribedGroups: Group[];
};

export default ({subscribedArtists, subscribedGroups}: Props) => {
  return (
    <div>
      <h1>Subscribed Artists</h1>
      <Artists artistUsers={subscribedArtists} />
      <h1>Subscribed Groups</h1>
      <Groups groups={subscribedGroups} />
    </div>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({req}) {
    const {authHeaders} = req.session;

    const subscribedGroupsReponse: SubscribedGroupsResponse =
      await UserController.getSubscribedGroups(authHeaders);

    const subscribedArtistsReponse: ArtistResponse =
      await UserController.getSubscribedArtists(authHeaders);

    return {
      props: {
        subscribedArtists: subscribedArtistsReponse.artistUsers,
        subscribedGroups: subscribedGroupsReponse.groups
      }
    };
  }
);
