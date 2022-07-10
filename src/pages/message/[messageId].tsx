import {useRouter} from "next/router";
import {withSessionSsr} from "config/withSession";
import {Id} from "types/common";
import {Message, LetterMessageResponse} from "types/message";
import MessageController from "server/controllers/MessageController";
import MessageDetail from "client/components/messages/MessageDetail";

type Props = {
  message: Message;
};

type ServerSideParams = {
  messageId: Id;
};

export default ({message}: Props) => {
  const router = useRouter();
  const {thumbnail} = router.query;

  return (
    <MessageDetail
      message={message}
      thumbnail={thumbnail as string | undefined}
    />
  );
};

export const getServerSideProps = withSessionSsr<Props>(async function (
  context
) {
  const {authHeaders} = context.req.session;
  const {messageId} = context.params as unknown as ServerSideParams;

  const messageDetailsResponse: LetterMessageResponse =
    await MessageController.getMessageDetails(messageId, authHeaders);

  return {
    props: {message: messageDetailsResponse.message}
  };
});
