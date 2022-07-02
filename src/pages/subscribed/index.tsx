import {withSessionSsr} from "Config/withSession";
import UserController from "Controllers/UserController";
import Artists from "Components/Artists";
import Groups from "Components/Groups";
import {ArtistResponse, ArtistUser} from "Types/artist";
import {SubscribedGroupsResponse, Group} from "Types/group";
import styles from "Client/styles/Index.module.css";

type Props = {
  subscribedArtists: ArtistUser[];
  subscribedGroups: Group[];
};

export default ({subscribedArtists, subscribedGroups}: Props) => {
  const hasSubscribedArtists = subscribedArtists.length > 0;
  const hasSubscribedgroups = subscribedGroups.length > 0;

  return (
    <div>
      <section>
        <h1 className={styles.sectionTitle}>
          {hasSubscribedArtists
            ? "Subscribed artists"
            : "No subscribed artists"}
        </h1>
        {hasSubscribedArtists && <Artists artistUsers={subscribedArtists} />}
      </section>
      <section>
        <h1 className={styles.sectionTitle}>
          {hasSubscribedgroups ? "Subscribed groups" : "No subscribed groups"}
        </h1>
        {hasSubscribedgroups && <Groups groups={subscribedGroups} />}
      </section>
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
