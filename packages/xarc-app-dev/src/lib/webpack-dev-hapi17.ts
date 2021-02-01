/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console, no-magic-numbers */

import { AppDevMiddleware } from "./app-dev-middleware";

/**
 * @param server
 */
function register(server) {
  const middleware = new AppDevMiddleware();

  middleware.setup();

  server.ext({
    type: "onRequest",
    method: (request, h) => {
      request.app.webpackDev = middleware.webpackDev;
      return h.continue;
    }
  });

  return;
}

export const hapi17Plugin = {
  name: "electrode-x-dev-hapi17",
  version: "1.0.0",
  register
};
