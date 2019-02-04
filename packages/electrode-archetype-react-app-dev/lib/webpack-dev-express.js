"use strict";
const AppDevMiddleware = require("./app-dev-middleware");

function setup(app) {
  const middleware = new AppDevMiddleware({});
  middleware.setup();
  app.use((req, res, next) => {
    if (!req.app) req.app = {};
    req.app.webpackDev = middleware.webpackDev;
    next();
  });
}

module.exports = setup;
