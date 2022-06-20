import ArtistController from "Controllers/ArtistController";
import {ArtistMessageResponse, Message} from "Types/message";
import Messages from "Components/Messages";
import {Id} from "Types/common";

type Props = {
  messages: Message[];
};

export default ({messages}: Props) => {
  return <Messages messages={messages} />;
};

export const getServerSideProps = async (context: {
  params: {artistUserId: Id};
}) => {
  const {artistUserId} = context.params;
  const response: ArtistMessageResponse = await ArtistController.getMessages(
    artistUserId
  );

  return {
    props: {
      messages: response.messages
    }
  };
};
