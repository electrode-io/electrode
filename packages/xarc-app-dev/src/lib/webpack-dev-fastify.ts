/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console, no-magic-numbers */

import { AppDevMiddleware } from "./app-dev-middleware";

/**
 * webpack dev server fastify plugin
 *
 * @param server fastify server
 *
 */
export async function fastifyPlugin(server: any): Promise<void> {
  if (process.env.WEBPACK_DEV) {
    const middleware = new AppDevMiddleware();

    middleware.setup();

    server.addHook("onRequest", async request => {
      request.app.webpackDev = middleware.webpackDev;
    });
  }
}
