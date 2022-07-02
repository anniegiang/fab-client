import {NextApiRequest, NextApiResponse} from "next";
import UserController from "server/controllers/UserController";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await UserController.getInfo(req.body);
  return res.status(200).json(response.user);
};
