import { AppDevMiddleware } from "./app-dev-middleware";

/**
 * webpack dev middleware for app using Koa
 * @param app - koa app
 */
export function koaMiddleware(app) {
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    const middleware = new AppDevMiddleware();
    middleware.setup();
    app.use(async (ctx, next) => {
      ctx.webpackDev = middleware.webpackDev;
      return next();
    });
  }
}
