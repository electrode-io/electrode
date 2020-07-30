/* eslint-disable @typescript-eslint/no-var-requires */
export {};

const AppDevMiddleware = require("./app-dev-middleware");

function setup(app) {
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    const middleware = new AppDevMiddleware({});
    middleware.setup();
    app.use((req, res, next) => {
      if (!req.app) req.app = {};
      req.app.webpackDev = middleware.webpackDev;
      next();
    });
  }
}

module.exports = setup;
