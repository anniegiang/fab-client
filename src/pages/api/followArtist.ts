import {NextApiRequest, NextApiResponse} from "next";
import {withSessionRoute} from "config/withSession";
import UserController from "server/controllers/UserController";
import {FollowArtistResponse} from "types/user";
import {Id} from "types/common";

type FollowArtistRequest = NextApiRequest & {
  body: {artistUserId: Id};
};

async function followArtistRoute(
  req: FollowArtistRequest,
  res: NextApiResponse<FollowArtistResponse>
) {
  const {authHeaders} = req.session;
  const {artistUserId} = req.body;
  const response = await UserController.followArtist(artistUserId, authHeaders);
  return res.status(200).json(response);
}

export default withSessionRoute(followArtistRoute);
