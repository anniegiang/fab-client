import {NextApiRequest, NextApiResponse} from "next";
import UserController from "Controllers/UserController";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const response = await UserController.getInfo();
  return res.status(200).json(response.user);
};
