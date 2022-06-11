import Link from "next/link";
import Image from "next/image";
import UserController from "Controllers/UserController";
import GroupController from "Controllers/GroupController";
import {UserInfoResponse, UserInfo} from "Types/user";
import {GroupResponse, Group} from "Types/groups";
import {LOONA_GROUP_ID} from "Constants/loona";

type Props = {
  user: UserInfo;
  loona: Group;
};

export default ({loona, user}: Props) => {
  const {enName, name, artistUsers} = loona;

  return (
    <div>
      <p>My points: {user.points}</p>
      <h1>{name}</h1>
      <h1>{enName}</h1>
      {artistUsers.map((member) => {
        return (
          <div>
            <Link key={member.id} href={`/member/${member.id}`}>
              <a>{member.artist.enName}</a>
            </Link>
            <Image src={member.profileImage} width={200} height={200} />
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps = async () => {
  const loonaResponse: GroupResponse = await GroupController.getGroupInfo(
    LOONA_GROUP_ID
  );

  const userResponse: UserInfoResponse = await UserController.getInfo();

  return {
    props: {
      loona: loonaResponse.group,
      user: userResponse.user
    }
  };
};
