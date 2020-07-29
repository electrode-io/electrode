"use strict";

/* eslint-disable no-console, no-magic-numbers */

const Middleware = require("./middleware");
const Url = require("url");
const mime = require("mime");
const fs = require("fs");

async function register(fastify) {
  const middleware = new Middleware({
    baseUrl: () => {
      return Url.format({
        hostname: process.env.HOST || "localhost",
        protocol: fastify.initialConfig.https ? "https" : "http",
        port: fastify.server.address().port
      });
    }
  });

  middleware.setup();

  fastify.addHook("onRequest", async (request, reply) => {
    // simulate a res to capture what the devMiddleware might send back
    await middleware.process(request.raw, reply.res, {
      skip: () => {},
      replyHtml: html => {
        reply
          .code(200)
          .header("Content-Type", "text/html")
          .send(`<!DOCTYPE html>${html}`);
      },
      replyNotFound: () => {
        reply.callNotFound();
      },
      replyError: err => {
        reply.send(err);
      },
      replyStaticData: data => {
        const type = mime.getType(request.url);
        if (type) {
          reply.header("Content-Type", type);
        }
        reply.code(200).send(data);
      },
      replyFile: async name => {
        let data;
        try {
          data = fs.readFileSync(name);
        } catch (e) {
          reply.code(404);
          return;
        }
        const type = mime.getType(name);
        if (type) {
          reply.header("Content-Type", type);
        }
        reply.code(200).send(data);
      }
    });
  });
  fastify.use(middleware.devMiddleware);
  fastify.use(middleware.hotMiddleware);
}

module.exports = register;
