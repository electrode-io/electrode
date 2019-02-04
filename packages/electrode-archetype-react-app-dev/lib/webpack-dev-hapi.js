"use strict";

/* eslint-disable no-console, no-magic-numbers */

const archetype = require("electrode-archetype-react-app/config/archetype");
const { universalHapiPlugin } = require("electrode-hapi-compat");
const hapi17Plugin = require("./webpack-dev-hapi17");

const AppDevMiddleware = require("./app-dev-middleware");

function register(server, options, next) {
  if (!archetype.webpack.devMiddleware) {
    console.error("dev-hapi plugin was loaded but WEBPACK_DEV_MIDDLEWARE is not true. Skipping.");
    return next();
  }

  const middleware = new AppDevMiddleware({});

  middleware.setup();

  server.ext({
    type: "onRequest",
    method: (request, reply) => {
      request.app.webpackDev = middleware.webpackDev;
      reply.continue();
    }
  });

  return next();
}

const registers = {
  hapi16: register,
  hapi17: hapi17Plugin
};

const pkg = {
  name: "electrode-dev-hapi",
  version: "1.0.0"
};

module.exports = universalHapiPlugin(registers, pkg);
