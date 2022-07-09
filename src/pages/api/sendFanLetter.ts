import {NextApiRequest, NextApiResponse} from "next";
import FanLetterController from "server/controllers/FanLetterController";
import {SendFanLetterPayload, SendFanLetterResponse} from "types/fanLetter";
import {withSessionRoute} from "config/withSession";
import {Id} from "types/common";
import querystring from "querystring";

type RequestBody = SendFanLetterPayload & {
  artistUserId: Id;
};

type SendFanLetterRequest = NextApiRequest & {
  body: RequestBody;
};

async function sendFanLetterRoute(
  req: SendFanLetterRequest,
  res: NextApiResponse<SendFanLetterResponse>
) {
  const {authHeaders} = req.session;
  const {artistUserId, text, title} = req.body as RequestBody;

  const response = await FanLetterController.sendFanLetter(
    artistUserId,
    authHeaders,
    querystring.stringify({text, title})
  );

  return res.status(200).json(response);
}

export default withSessionRoute(sendFanLetterRoute);
