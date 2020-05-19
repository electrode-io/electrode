"use strict";

module.exports = {
  require,
  hapiPlugin: require("./lib/webpack-dev-hapi"),
  fastifyPlugin: require("./lib/webpack-dev-fastify"),
  expressMiddleware: require("./lib/webpack-dev-express"),
  koaMiddleware: require("./lib/webpack-dev-koa")
};
