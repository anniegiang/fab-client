import {withSessionSsr} from "config/withSession";
import ArtistController from "server/controllers/ArtistController";
import {ArtistMessageResponse, Message} from "types/message";
import Messages from "client/components/messages/Messages";
import {Id} from "types/common";

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
