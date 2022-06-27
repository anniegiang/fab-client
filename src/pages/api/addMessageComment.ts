import {NextApiRequest, NextApiResponse} from "next";
import MessageController from "Controllers/MessageController";
import {withSessionRoute} from "Config/withSession";
import {Comment} from "Types/comment";
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
  console.log({body: req.body, authHeaders});
  const response = await MessageController.addMessageComment(
    authHeaders,
    messageId,
    querystring.stringify({comment})
  );

  return res.status(200).json(response);
}

export default withSessionRoute(addMessageCommentRoute);
