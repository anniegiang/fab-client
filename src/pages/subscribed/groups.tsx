import UserController from "Controllers/UserController";
import Groups from "Components/Groups";
import {SubscribedGroupsResponse, Group} from "Types/groups";

type Props = {
  subscribedGroups: Group[];
};

export default ({subscribedGroups}: Props) => {
  return (
    <div>
      <h1>Subscribed Groups</h1>
      <Groups groups={subscribedGroups} />;
    </div>
  );
};

export const getServerSideProps = async () => {
  const subscribedGroupsReponse: SubscribedGroupsResponse =
    await UserController.getSubscribedGroups();

  return {
    props: {
      subscribedGroups: subscribedGroupsReponse.groups
    }
  };
};
