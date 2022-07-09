import {NextApiRequest, NextApiResponse} from "next";
import FanLetterController from "server/controllers/FanLetterController";
import {DeleteFanLetterResponse} from "types/fanLetter";
import {withSessionRoute} from "config/withSession";
import {Id} from "types/common";

type RequestBody = {
  fanLetterId: Id;
};

type DeleteFanLetterRequest = NextApiRequest & {
  body: RequestBody;
};

async function deleteFanLetterRoute(
  req: DeleteFanLetterRequest,
  res: NextApiResponse<DeleteFanLetterResponse>
) {
  const {authHeaders} = req.session;
  const {fanLetterId} = req.body as RequestBody;

  const response = await FanLetterController.deleteFanLetter(
    fanLetterId,
    authHeaders
  );

  return res.status(200).json(response);
}

export default withSessionRoute(deleteFanLetterRoute);
