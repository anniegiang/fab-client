import {NextApiRequest, NextApiResponse} from "next";
import MessageController from "server/controllers/MessageController";
import {withSessionRoute} from "config/withSession";
import {Comment} from "types/comment";
import querystring from "querystring";

type AddMessageCommentRequest = NextApiRequest & {
  body: {comment: string};
};

async function addMessageCommentRoute(
  req: AddMessageCommentRequest,
  res: NextApiResponse<Comment>
) {
  const {authHeaders} = req.session;
  const {messageId, comment} = req.body;

  const response = await MessageController.addMessageComment(
    authHeaders,
    messageId,
    querystring.stringify({comment})
  );

  return res.status(200).json(response);
}

export default withSessionRoute(addMessageCommentRoute);
