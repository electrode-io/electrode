"use strict";

/* eslint-disable no-console, no-magic-numbers */

const Url = require("url");
const mime = require("mime");
const fs = require("fs");

const Middleware = require("./middleware");
const FakeRes = require("../fake-res");

function register(server) {
  const middleware = new Middleware({
    baseUrl: () => {
      return Url.format({
        hostname: process.env.HOST || "localhost",
        protocol: server.info.protocol,
        port: server.info.port
      });
    }
  });

  middleware.setup();

  server.ext({
    type: "onRequest",
    method: (request, h) => {
      if (request.path === "/favicon.ico") {
        return h.response("").code(404).takeover();
      }
      const { req } = request.raw;

      // simulate a res to capture what the devMiddleware might send back
      const fakeRes = new FakeRes();

      return middleware
        .process(req, fakeRes, {
          skip: () => h.continue, // skip middleware and continue request cycle
          replyHtml: html => {
            return h
              .response(`<!DOCTYPE html>${html}`)
              .code(200)
              .header("Content-Type", "text/html")
              .takeover();
          },
          replyError: err => {
            return h.response(err);
          },
          replyStaticData: data => {
            const type = mime.getType(req.url);
            const resp = h.response(data).code(200);
            if (type) {
              resp.header("Content-Type", type);
            }
            return resp.takeover();
          },
          replyFile: name => {
            let data;
            try {
              data = fs.readFileSync(name);
            } catch (e) {
              return h.code(404);
            }
            const type = mime.getType(name);
            const resp = h.response(data).code(200);
            if (type) {
              resp.header("Content-Type", type);
            }
            return resp.takeover();
          }
        })
        .then(next1 => {
          if (fakeRes.responded) {
            return fakeRes.hapi17Respond(h);
          }

          if (next1 !== undefined && next1 !== middleware.canContinue) {
            return next1;
          }

          request.app.webpackDev = middleware.webpackDev;

          return middleware
            .devMiddleware(req, fakeRes, () => {
              return Promise.resolve(middleware.canContinue);
            })
            .then(() => {
              if (fakeRes.responded) {
                // send back result from fakeRes
                return fakeRes.hapi17Respond(h);
              }

              return h.continue;
            });
        })
        .catch(err => {
          console.error("webpack dev middleware error", err);
          return h.response(err);
        });
    }
  });

  server.ext({
    type: "onRequest",
    method: request => {
      const { req, res } = request.raw;

      return new Promise((resolve, reject) => {
        middleware.hotMiddleware(req, res, () => {
          reject(new Error("Not expecting webpack hot middleware to invoke callback"));
        });
        // unfortunately the only way to get Hapi 17 to not do anything after a request
        // is taken over is by returning an unresolved promise.
        // awaits further info at https://github.com/hapijs/hapi/issues/3884
      });
    }
  });

  return;
}

module.exports = register;
