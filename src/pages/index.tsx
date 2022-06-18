import UserController from "Controllers/UserController";
import GroupController from "Controllers/GroupController";
import {UserInfoResponse, UserInfo} from "Types/user";
import {GroupResponse, Group} from "Types/groups";
import {LOONA_GROUP_ID} from "Constants/loona";
import Members from "Components/Members";
import NavBar from "Components/navbar/NavBar";

type Props = {
  user: UserInfo;
  loona: Group;
};

export default ({loona, user}: Props) => {
  // const {enName, name, artistUsers} = loona;

  return (
    <div>
      <NavBar user={user} />
      {/* <Members members={artistUsers} /> */}
    </div>
  );
};

export const getServerSideProps = async () => {
  // const loonaResponse: GroupResponse = await GroupController.getGroupInfo(
  //   LOONA_GROUP_ID
  // );

  const userResponse: UserInfoResponse = await UserController.getInfo();

  return {
    props: {
      // loona: loonaResponse.group,
      user: userResponse.user
    }
  };
};
