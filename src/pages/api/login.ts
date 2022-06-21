import {NextApiRequest, NextApiResponse} from "next";
import {SessionControllerInstance} from "Controllers/SessionController";
import {SessionResponse} from "Types/session";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SessionResponse>
) => {
  const {userId, accessToken} = req.body;
  const response = await SessionControllerInstance.login(userId, accessToken);
  return res.status(200).json(response);
};
