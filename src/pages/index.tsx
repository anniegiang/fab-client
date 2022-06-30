import {withSessionSsr} from "Config/withSession";
import UserController from "Controllers/UserController";
import MessageController from "Controllers/MessageController";
import Artists from "Components/Artists";
import Groups from "Components/Groups";
import Messages from "Components/Messages";
import {ArtistResponse, ArtistUser} from "Types/artist";
import {SubscribedGroupsResponse, Group} from "Types/group";
import styles from "Client/styles/Index.module.css";
import {NewestMessagesResponse, Message} from "Types/message";
import {NotificationsReponse, Notification} from "Types/notification";

type Props = {
  subscribedArtists: ArtistUser[];
  subscribedGroups: Group[];
  newestMessages: Message[];
  notifications: Notification[];
};

export default ({
  subscribedArtists,
  subscribedGroups,
  newestMessages
}: Props) => {
  const hasSubscribedArtists = subscribedArtists.length > 0;
  const hasSubscribedgroups = subscribedGroups.length > 0;
  const hasNewestMessages = newestMessages.length > 0;

  return (
    <div>
      <section>
        <h1 className={styles.sectionTitle}>
          {hasNewestMessages ? "Newest messages" : "No newest messages"}
        </h1>
        {hasNewestMessages && (
          <Messages messages={newestMessages} showSectionTitle={false} />
        )}
      </section>
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

    const newestMessagesResponse: NewestMessagesResponse =
      await MessageController.getNewestMessages(authHeaders);

    const notificationsResponse: NotificationsReponse =
      await UserController.getNotifications(authHeaders);

    return {
      props: {
        subscribedArtists: subscribedArtistsReponse.artistUsers,
        subscribedGroups: subscribedGroupsReponse.groups,
        newestMessages: newestMessagesResponse.messages,
        notifications: notificationsResponse.notifications
      }
    };
  }
);
