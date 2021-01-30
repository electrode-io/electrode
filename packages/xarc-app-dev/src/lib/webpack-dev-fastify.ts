/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console, no-magic-numbers */

import { AppDevMiddleware } from "./app-dev-middleware";

export async function fastifyPlugin(server) {
  if (process.env.WEBPACK_DEV) {
    const middleware = new AppDevMiddleware();

    middleware.setup();

    server.addHook("onRequest", async request => {
      request.app.webpackDev = middleware.webpackDev;
    });
  }

  return;
}
