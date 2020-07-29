"use strict";

/* eslint-disable no-console, no-magic-numbers */

const Url = require("url");
const mime = require("mime");
const koaSend = require("koa-send");
const path = require("path");
const Promise = require("bluebird");

const Middleware = require("./middleware");
const FakeRes = require("../fake-res");

function setup(app, protocol, port) {
  const middleware = new Middleware({
    baseUrl: () => {
      return Url.format({
        hostname: process.env.HOST || "localhost",
        protocol: protocol || "http",
        port: port || process.env.PORT || "3000"
      });
    }
  });

  middleware.setup();

  const devMiddleware = (ctx, next) => {
    const { request: req, response: res } = ctx;
    // simulate a res to capture what the devMiddleware might send back
    const fakeRes = new FakeRes();

    return middleware
      .process(req, fakeRes, {
        skip: () => next(), // skip middleware and continue request cycle
        replyHtml: html => {
          res.type = "html";
          res.status = 200;
          res.body = `<!DOCTYPE html>${html}`;
        },
        replyNotFound: () => {
          res.status = 404;
          res.body = "Not Found";
          return res;
        },
        replyError: err => {
          res.status = 500;
          res.body = err;
          return res;
        },
        replyStaticData: data => {
          const type = mime.getType(req.url);
          if (type) {
            res.append("Content-Type", type);
          }
          res.status = 200;
          res.body = data;
        },
        replyFile: async name => {
          await koaSend(ctx, path.basename(name), { root: path.dirname(name) });
        }
      })
      .then(next1 => {
        if (fakeRes.responded) {
          return fakeRes.koaRespond(res);
        }

        if (next1 !== middleware.canContinue) {
          return undefined;
        }

        req.app.webpackDev = middleware.webpackDev;
        res.status = 200;
        return next();
      });
  };
  const e2K = (ctx, exMid, next) => Promise.promisify(exMid)(ctx.req, ctx.res).then(next);
  app.use(devMiddleware);
  app.use(async (ctx, next) => e2K(ctx, middleware.devMiddleware, next));
  app.use(async (ctx, next) => e2K(ctx, middleware.hotMiddleware, next));
}

module.exports = setup;
