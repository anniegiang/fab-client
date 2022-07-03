import {SetupServerApi} from "msw/node";

export default (server: SetupServerApi) => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};
