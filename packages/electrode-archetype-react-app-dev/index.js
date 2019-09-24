"use strict";

module.exports = {
  require,
  hapiPlugin: require("./lib/webpack-dev-hapi"),
  expressMiddleware: require("./lib/webpack-dev-express"),
  koaMiddleware: require("./lib/webpack-dev-koa")
};
