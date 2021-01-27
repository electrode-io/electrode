/* eslint-disable no-console, no-magic-numbers */

import { AppDevMiddleware } from "./app-dev-middleware";

export function register(server, options, next) {
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
      next(err);
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
