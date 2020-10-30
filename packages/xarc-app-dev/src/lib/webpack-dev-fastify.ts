/* eslint-disable @typescript-eslint/no-var-requires */
export {};

/* eslint-disable no-console, no-magic-numbers */

const AppDevMiddleware = require("./app-dev-middleware");

async function register(server) {
  if (process.env.WEBPACK_DEV) {
    const middleware = new AppDevMiddleware({});

    middleware.setup();

    server.addHook("onRequest", async request => {
      request.app.webpackDev = middleware.webpackDev;
    });
  }

  return;
}

module.exports = register;
