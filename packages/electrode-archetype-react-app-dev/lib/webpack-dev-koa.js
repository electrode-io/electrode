"use strict";
const AppDevMiddleware = require("./app-dev-middleware");

function setup(app) {
  const { BABEL_ENV, NODE_ENV } = process.env;
  const isProduction = (BABEL_ENV || NODE_ENV) === "production";
  if (!isProduction) {
    const middleware = new AppDevMiddleware({});
    middleware.setup();
    app.use(async (ctx, next) => {
      ctx.webpackDev = middleware.webpackDev;
      return next();
    });
  }
}

module.exports = setup;
