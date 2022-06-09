import "dotenv/config";
import environment from "Constants/environment";
import {Environment} from "Types/coreTypes";

const _environment: Environment =
  (process.env.ENVIRONMENT as Environment) ?? environment.development;

export default _environment;
