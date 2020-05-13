"use strict";
/* eslint-disable no-console, no-magic-numbers */

const archetype = require("@xarc/app/config/archetype");

const AppDevMiddleware = require("./app-dev-middleware");

async function register(server) {
  if (!archetype.webpack.devMiddleware) {
    console.error(
      "dev-fastify plugin was loaded but WEBPACK_DEV_MIDDLEWARE is not true. Skipping."
    );
    return;
  }

  const middleware = new AppDevMiddleware({});

  middleware.setup();

  server.addHook("onRequest", async request => {
    request.app.webpackDev = middleware.webpackDev;
  });

  return;
}

module.exports = register;
