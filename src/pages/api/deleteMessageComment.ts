import {NextApiRequest, NextApiResponse} from "next";
import MessageController from "server/controllers/MessageController";
import {withSessionRoute} from "config/withSession";
import {DeleteCommentResponse} from "types/comment";
import {Id} from "types/common";

type DeleteMessageCommentRequest = NextApiRequest & {
  body: {commentId: Id};
};

async function deleteMessageCommentRoute(
  req: DeleteMessageCommentRequest,
  res: NextApiResponse<DeleteCommentResponse>
) {
  const {authHeaders} = req.session;
  const {messageId, commentId} = req.body;

  const response = await MessageController.deleteMessageComment(
    authHeaders,
    messageId,
    commentId
  );
  return res.status(200).json(response);
}

export default withSessionRoute(deleteMessageCommentRoute);
