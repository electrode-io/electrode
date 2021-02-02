/* eslint-disable no-console, no-magic-numbers */

import { AppDevMiddleware } from "./app-dev-middleware";

/**
 * Hapi 16 and lower plugin for webpack dev
 *
 * @param server hapi server
 * @param _options plugin options
 * @param next callback
 *
 * @returns nothing
 */
export function register(server: any, _options: any, next: (err?: Error) => void): void {
  try {
    const middleware = new AppDevMiddleware();

    middleware.setup();

    server.ext({
      type: "onRequest",
      method: (request, reply) => {
        request.app.webpackDev = middleware.webpackDev;
        reply.continue();
      }
    });
    return next && next();
  } catch (err) {
    if (next) {
      return next(err);
    } else {
      throw err;
    }
  }
}

const pkg = {
  name: "electrode-x-dev-hapi16",
  version: "1.0.0"
};

register.attributes = { pkg };

export const hapiPlugin = {
  register
};
