import {NextApiRequest, NextApiResponse} from "next";
import {withSessionRoute} from "config/withSession";
import UserController from "server/controllers/UserController";
import {UnfollowGroupResponse} from "types/user";
import {Id} from "types/common";

type UnfollowGroupRequest = NextApiRequest & {
  body: {groupId: Id};
};

async function unfollowGroupRoute(
  req: UnfollowGroupRequest,
  res: NextApiResponse<UnfollowGroupResponse>
) {
  const {authHeaders} = req.session;
  const {groupId} = req.body;
  const response = await UserController.unfollowGroup(groupId, authHeaders);
  return res.status(200).json(response);
}

export default withSessionRoute(unfollowGroupRoute);
