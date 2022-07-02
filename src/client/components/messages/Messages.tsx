import moment from "moment-timezone";
import {Message as MessageType} from "types/message";
import styles from "client/styles/Messages.module.css";
import Message from "client/components/messages/Message";

type Props = {
  messages: MessageType[];
  showSectionTitle?: boolean;
};

export default ({messages, showSectionTitle = true}: Props) => {
  const messagesByMonth = groupedAndSortedMessagesByMonth(messages);

  if (messagesByMonth.length === 0) {
    return <h1>No messages</h1>;
  }

  return (
    <div className={styles.container}>
      {messagesByMonth.map((month) => {
        const sectionTitle = moment(month[0].createdAt).format("YYYY/M");
        return (
          <section key={sectionTitle} className={styles.section}>
            {showSectionTitle && (
              <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
            )}
            <div className={styles.sectionMessages}>
              {month.map((message: MessageType) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

const groupedAndSortedMessagesByMonth = (
  messages: MessageType[]
): MessageType[][] => {
  const grouped: {[month: string]: MessageType[]} = {};

  messages.forEach((message) => {
    const month = moment(message.createdAt).format("MMMM YYYY");
    if (grouped[month] === undefined) {
      grouped[month] = [];
    }
    grouped[month].push(message);
  });

  const sortedMonths = Object.keys(grouped).sort(
    (a, b) => moment(b).valueOf() - moment(a).valueOf()
  );

  return sortedMonths.map((month) => grouped[month]);
};
