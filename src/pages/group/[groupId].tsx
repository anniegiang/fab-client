import GroupController from "Controllers/GroupController";
import {GroupResponse, Group} from "Types/groups";
import Members from "Components/Members";
import {Id} from "Types/coreTypes";

type Props = {
  group: Group;
};

export default ({group}: Props) => {
  const {artistUsers, name} = group;

  return (
    <div>
      <h1>{name}</h1>
      <Members members={artistUsers} />
    </div>
  );
};

export const getServerSideProps = async (context: {params: {groupId: Id}}) => {
  const {groupId} = context.params;
  const groupResponse: GroupResponse = await GroupController.getGroupInfo(
    groupId
  );

  return {
    props: {
      group: groupResponse.group
    }
  };
};
