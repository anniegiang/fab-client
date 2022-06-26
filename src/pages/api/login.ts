import {NextApiRequest, NextApiResponse} from "next";
import {SessionControllerInstance} from "Controllers/SessionController";
import {withSessionRoute} from "Config/withSession";
import {AuthHeaders, SessionResponse} from "Types/session";

type UserLoginApiRequest = NextApiRequest & {
  body: AuthHeaders;
};

async function loginRoute(
  req: UserLoginApiRequest,
  res: NextApiResponse<SessionResponse>
) {
  const {userid, accesstoken} = req.body;
  const response = await SessionControllerInstance.login(userid, accesstoken);

  if (!response.isError) {
    req.session.authHeaders = {
      userid,
      accesstoken
    };

    await req.session.save();
    return res.status(200).json(response);
  }

  return res.json(response);
}

export default withSessionRoute(loginRoute);
