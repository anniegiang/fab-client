import GroupController from "server/controllers/GroupController";
import {GroupResponse, Group} from "types/group";
import {GroupMessagseResponse, Message} from "types/message";
import Artists from "client/components/artists/Artists";
import Messages from "client/components/messages/Messages";
import {Id} from "types/common";
import {withSessionSsr} from "config/withSession";

type Props = {
  group: Group;
  groupMessages: Message[];
};

type ServerSideParams = {
  groupId: Id;
};

export default ({group, groupMessages}: Props) => {
  const {artistUsers, name} = group;

  return (
    <div>
      <section>
        <h1>{name}</h1>
        <Artists artistUsers={artistUsers} />
      </section>
      <section>
        <h1>Messages</h1>
        <Messages messages={groupMessages} />
      </section>
    </div>
  );
};

export const getServerSideProps = withSessionSsr<Props>(async (context) => {
  const {authHeaders} = context.req.session;
  const {groupId} = context.params as unknown as ServerSideParams;

  const groupResponse: GroupResponse = await GroupController.getGroupInfo(
    groupId,
    authHeaders
  );

  const groupMessagesResponse: GroupMessagseResponse =
    await GroupController.getGroupMessages(groupId, authHeaders);

  return {
    props: {
      group: groupResponse.group,
      groupMessages: groupMessagesResponse.messages
    }
  };
});
