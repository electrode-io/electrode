"use strict";

/* eslint-disable no-console, no-magic-numbers */

const Url = require("url");
const mime = require("mime");
const archetype = require("electrode-archetype-react-app/config/archetype");

const Middleware = require("./webpack-middleware");

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

  const devMiddleware = (req, res, next) => {
    const procResult = middleware.process(req, res, {
      skip: () => next(), // skip middleware and continue request cycle
      replyHtml: html => {
        res
          .type("html")
          .status(200)
          .send(`<!DOCTYPE html>${html}`);
      },
      replyNotFound: () => res.status(404).send("Not Found"),
      replyError: err => res.status(500).send(err),
      replyStaticData: data => {
        const type = mime.lookup(req.url);
        if (type) {
          const charset = mime.charsets.lookup(type);
          res.set("Content-Type", type + (charset ? `; charset=${charset}` : ""));
        }
        res.status(200).send(data);
      },
      replyFile: name => res.sendFile(name)
    });

    if (procResult !== middleware.canContinue) {
      return undefined;
    }

    req.app.webpackDev = middleware.webpackDev;
    return next();
  };

  if (archetype.webpack.devMiddleware) {
    app.use(devMiddleware);
    app.use(middleware.devMiddleware);
    app.use(middleware.hotMiddleware);
  }
}

module.exports = setup;
