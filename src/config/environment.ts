import "dotenv/config";
import environment from "constants/environment";
import {Environment} from "types/common";

const _environment: Environment =
  (process.env.NEXT_PUBLIC_ENVIRONMENT as Environment) ??
  environment.development;

export default _environment;
