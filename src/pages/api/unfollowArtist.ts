import {NextApiRequest, NextApiResponse} from "next";
import {withSessionRoute} from "config/withSession";
import UserController from "server/controllers/UserController";
import {UnfollowArtistResponse} from "types/user";
import {Id} from "types/common";

type UnfollowArtistRequest = NextApiRequest & {
  body: {artistUserId: Id};
};

async function unFollowArtistRoute(
  req: UnfollowArtistRequest,
  res: NextApiResponse<UnfollowArtistResponse>
) {
  const {authHeaders} = req.session;
  const {artistUserId} = req.body;
  const response = await UserController.unfollowArtist(
    artistUserId,
    authHeaders
  );
  return res.status(200).json(response);
}

export default withSessionRoute(unFollowArtistRoute);
