"use strict";
const AppDevMiddleware = require("./app-dev-middleware");

function setup(app) {
  const middleware = new AppDevMiddleware({});
  middleware.setup();
  app.use(async (ctx, next) => {
    ctx.webpackDev = middleware.webpackDev;
    return next();
  });
}

module.exports = setup;
