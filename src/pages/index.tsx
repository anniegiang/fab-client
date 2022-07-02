import {withSessionSsr} from "Config/withSession";
import UserController from "Controllers/UserController";
import MessageController from "Controllers/MessageController";
import Messages from "Components/Messages";
import styles from "Client/styles/Index.module.css";
import {NewestMessagesResponse, Message} from "Types/message";
import {NotificationsReponse, Notification} from "Types/notification";

type Props = {
  newestMessages: Message[];
  notifications: Notification[];
};

export default ({newestMessages}: Props) => {
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
    </div>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({req}) {
    const {authHeaders} = req.session;

    const newestMessagesResponse: NewestMessagesResponse =
      await MessageController.getNewestMessages(authHeaders);

    const notificationsResponse: NotificationsReponse =
      await UserController.getNotifications(authHeaders);

    return {
      props: {
        newestMessages: newestMessagesResponse.messages,
        notifications: notificationsResponse.notifications
      }
    };
  }
);
