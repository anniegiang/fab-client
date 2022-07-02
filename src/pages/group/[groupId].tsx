import GroupController from "Controllers/GroupController";
import {GroupResponse, Group} from "Types/group";
import {GroupMessageResponse, Message} from "Types/message";
import Artists from "Components/Artists";
import Messages from "Components/Messages";
import {Id} from "Types/common";
import {withSessionSsr} from "Config/withSession";

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

  const groupMessagesResponse: GroupMessageResponse =
    await GroupController.getGroupMessages(groupId, authHeaders);

  return {
    props: {
      group: groupResponse.group,
      groupMessages: groupMessagesResponse.messages
    }
  };
});
