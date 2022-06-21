import axios from "axios";
import {useState, FormEvent} from "react";
import UserController from "Controllers/UserController";
import Artists from "Components/Artists";
import Groups from "Components/Groups";
import {ArtistResponse, ArtistUser} from "Types/artist";
import {SubscribedGroupsResponse, Group} from "Types/group";
import {useAccessToken, useUserId} from "Client/hooks/useLocalSession";
import LoginForm from "Client/components/LoginForm";
import {LoginFields} from "Types/session";
import LocalSession from "Client/LocalSession";

type Props = {
  subscribedArtists: ArtistUser[];
  subscribedGroups: Group[];
};

export default ({subscribedArtists, subscribedGroups}: Props) => {
  const {userId, setUserId} = useUserId();
  const {accessToken, setAccessToken} = useAccessToken();
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const handleSubmit = async (e: FormEvent, fields: LoginFields) => {
    e.preventDefault();
    return axios
      .post("/api/login", {
        userId: Number(fields.userId),
        accessToken: fields.accessToken
      })
      .then((response) => {
        if (response.data.isAuthenticated) {
          setUserId(fields.userId);
          setAccessToken(fields.accessToken);
          setIsLoginFailed(false);
        } else {
          setIsLoginFailed(true);
        }
      })
      .catch(() => {
        setIsLoginFailed(true);
      });
  };

  if (!userId && !accessToken) {
    return (
      <LoginForm handleSubmit={handleSubmit} isLoginFailed={isLoginFailed} />
    );
  }

  return (
    <div>
      <h1>Subscribed Artists</h1>
      {/* <Artists artistUsers={subscribedArtists} /> */}
      <h1>Subscribed Groups</h1>
      {/* <Groups groups={subscribedGroups} /> */}
    </div>
  );
};

export const getServerSideProps = async () => {
  // const subscribedGroupsReponse: SubscribedGroupsResponse =
  //   await UserController.getSubscribedGroups();
  // const subscribedArtistsReponse: ArtistResponse =
  //   await UserController.getSubscribedArtists();

  return {
    props: {
      //   subscribedArtists: subscribedArtistsReponse.artistUsers,
      //   subscribedGroups: subscribedGroupsReponse.groups
      // }
    }
  };
};
