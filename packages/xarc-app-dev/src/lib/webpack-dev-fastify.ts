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

    // TODO: find out how to get fastify listening event
    const waitListen = setInterval(() => {
      const address = server.server.address();
      if (address) {
        clearInterval(waitListen);
        middleware.update({ serverPort: address.port });
      }
    }, 20).unref();

    server.addHook("onRequest", async request => {
      request.app.webpackDev = middleware.webpackDev;
    });
  }
}
