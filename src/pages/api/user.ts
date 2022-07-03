import {NextApiRequest, NextApiResponse} from "next";
import {withSessionRoute} from "config/withSession";
import UserController from "server/controllers/UserController";
import {UserInfo} from "types/user";

async function userInfoRoute(
  req: NextApiRequest,
  res: NextApiResponse<UserInfo>
) {
  const {authHeaders} = req.session;
  const response = await UserController.getInfo(authHeaders);
  return res.status(200).json(response.user);
}

export default withSessionRoute(userInfoRoute);
