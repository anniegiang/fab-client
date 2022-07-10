import {useRouter} from "next/router";
import {withSessionSsr} from "config/withSession";
import {Id} from "types/common";
import ArtistController from "server/controllers/ArtistController";
import {ArtistMessageResponse, Message} from "types/message";
import Messages from "client/components/messages/Messages";
import PrimaryButton from "client/components/base/PrimaryButton";
import {PATHS} from "constants/pages";

type Props = {
  messages: Message[];
};

type ServerSideParams = {
  artistUserId: Id;
};

export default ({messages}: Props) => {
  const router = useRouter();
  const {artistUserId} = router.query;

  return (
    <div>
      <PrimaryButton
        text="Write letter"
        linkHref={`${PATHS.fanLetters}/write?artistUserId=${artistUserId}`}
      />
      <Messages messages={messages} />;
    </div>
  );
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
