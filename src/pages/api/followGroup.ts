import {NextApiRequest, NextApiResponse} from "next";
import {withSessionRoute} from "config/withSession";
import UserController from "server/controllers/UserController";
import {FollowGroupResponse} from "types/user";
import {Id} from "types/common";

type FollowGroupRequest = NextApiRequest & {
  body: {groupId: Id};
};

async function followGroupRoute(
  req: FollowGroupRequest,
  res: NextApiResponse<FollowGroupResponse>
) {
  const {authHeaders} = req.session;
  const {groupId} = req.body;
  const response = await UserController.followGroup(groupId, authHeaders);
  return res.status(200).json(response);
}

export default withSessionRoute(followGroupRoute);
