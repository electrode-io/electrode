"use strict";
/* eslint-disable no-console, no-magic-numbers */

const fastifyPlugin = require("fastify-plugin");

const archetype = require("electrode-archetype-react-app/config/archetype");

const AppDevMiddleware = require("./app-dev-middleware");

function register(server) {
  if (!archetype.webpack.devMiddleware) {
    console.error(
      "dev-fastify plugin was loaded but WEBPACK_DEV_MIDDLEWARE is not true. Skipping."
    );
    return;
  }

  const middleware = new AppDevMiddleware({});

  middleware.setup();

  server.addHook("onRequest", (request, _, done) => {
    request.app.webpackDev = middleware.webpackDev;
    done();
  });

  return;
}

module.exports = fastifyPlugin(register, {
  name: "electrode-archetype-react-app-dev"
});
