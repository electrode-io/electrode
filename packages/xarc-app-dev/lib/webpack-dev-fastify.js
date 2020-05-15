"use strict";
/* eslint-disable no-console, no-magic-numbers */

const AppDevMiddleware = require("./app-dev-middleware");

async function register(server) {
  const middleware = new AppDevMiddleware({});

  middleware.setup();

  server.addHook("onRequest", async request => {
    request.app.webpackDev = middleware.webpackDev;
  });

  return;
}

module.exports = register;
