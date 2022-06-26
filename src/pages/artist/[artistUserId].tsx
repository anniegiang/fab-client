import {withSessionSsr} from "Config/withSession";
import ArtistController from "Controllers/ArtistController";
import {ArtistMessageResponse, Message} from "Types/message";
import Messages from "Components/Messages";
import {Id} from "Types/common";

type Props = {
  messages: Message[];
};

type ServerSideParams = {
  artistUserId: Id;
};

export default ({messages}: Props) => {
  return <Messages messages={messages} />;
};

export const getServerSideProps = withSessionSsr<Props>(async function (
  context
) {
  const {artistUserId} = context.params as unknown as ServerSideParams;

  const response: ArtistMessageResponse = await ArtistController.getMessages(
    artistUserId,
    context.req.session.authHeaders
  );

  return {
    props: {
      messages: response.messages
    }
  };
});
