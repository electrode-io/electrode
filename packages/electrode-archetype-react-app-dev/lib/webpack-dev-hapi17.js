"use strict";

/* eslint-disable no-console, no-magic-numbers */

const archetype = require("electrode-archetype-react-app/config/archetype");

const AppDevMiddleware = require("./app-dev-middleware");

function register(server) {
  if (!archetype.webpack.devMiddleware) {
    console.error("dev-hapi plugin was loaded but WEBPACK_DEV_MIDDLEWARE is not true. Skipping.");
    return;
  }

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
