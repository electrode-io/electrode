import { AppDevMiddleware } from "./app-dev-middleware";

/**
 * Express middleware for webpack dev server
 * @param app
 */
export function expressMiddleware(app) {
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    const middleware = new AppDevMiddleware();
    middleware.setup();
    app.use((req, res, next) => {
      if (!req.app) req.app = {};
      req.app.webpackDev = middleware.webpackDev;
      next();
    });
  }
}
