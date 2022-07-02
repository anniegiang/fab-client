import {withSessionSsr} from "config/withSession";
import UserController from "server/controllers/UserController";
import Artists from "client/components/artists/Artists";
import Groups from "client/components/groups/Groups";
import {ArtistResponse, ArtistUser} from "types/artist";
import {SubscribedGroupsResponse, Group} from "types/group";
import styles from "client/styles/Index.module.css";

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
