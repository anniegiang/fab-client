import UserController from "Controllers/UserController";
import {UserInfoResponse, UserInfo} from "Types/user";
import {Group} from "Types/groups";
import NavBar from "Components/navbar/NavBar";

type Props = {
  user: UserInfo;
  loona: Group;
};

export default ({loona, user}: Props) => {
  return (
    <div>
      <NavBar user={user} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const userResponse: UserInfoResponse = await UserController.getInfo();
  return {
    props: {
      user: userResponse.user
    }
  };
};
