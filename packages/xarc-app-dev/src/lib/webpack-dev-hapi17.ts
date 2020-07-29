/* eslint-disable @typescript-eslint/no-var-requires */
export {};

/* eslint-disable no-console, no-magic-numbers */

const AppDevMiddleware = require("./app-dev-middleware");

function register(server) {
  const middleware = new AppDevMiddleware({});

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

module.exports = register;
