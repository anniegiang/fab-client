import {useState} from "react";
import UserController from "Controllers/UserController";
import Artists from "Components/Artists";
import Groups from "Components/Groups";
import {ArtistResponse, ArtistUser} from "Types/artist";
import {SubscribedGroupsResponse, Group} from "Types/group";
import {useGetItem} from "Client/hooks/useLocalStorage";
import LocalStorage from "Client/LocalStorage";

type Props = {
  subscribedArtists: ArtistUser[];
  subscribedGroups: Group[];
};

export default ({subscribedArtists, subscribedGroups}: Props) => {
  const [_userId, setUserId] = useState("");
  const [_accessToken, setAccessToken] = useState("");
  const userId = useGetItem("userId");
  const accessToken = useGetItem("accessToken");

  if (userId === null && accessToken === null) {
    return (
      <div>
        <p>Please login</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (_userId && _accessToken) {
              LocalStorage.set("userId", _userId);
              LocalStorage.set("accessToken", _accessToken);
            }
          }}
        >
          <input
            type="text"
            placeholder="User Id"
            value={_userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Access Token"
            value={_accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Subscribed Artists</h1>
      <Artists artistUsers={subscribedArtists} />
      <h1>Subscribed Groups</h1>
      <Groups groups={subscribedGroups} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const subscribedGroupsReponse: SubscribedGroupsResponse =
    await UserController.getSubscribedGroups();
  const subscribedArtistsReponse: ArtistResponse =
    await UserController.getSubscribedArtists();

  return {
    props: {
      subscribedArtists: subscribedArtistsReponse.artistUsers,
      subscribedGroups: subscribedGroupsReponse.groups
    }
  };
};
