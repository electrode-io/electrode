"use strict";

/* eslint-disable no-console, no-magic-numbers */

const fastifyPlugin = require("fastify-plugin");
const archetype = require("@xarc/app/config/archetype");
const Middleware = require("./middleware");
const Url = require("url");
const mime = require("mime");
const fs = require("fs");

async function register(fastify) {
  if (!archetype.webpack.devMiddleware) {
    console.error("dev-hapi plugin was loaded but WEBPACK_DEV_MIDDLEWARE is not true. Skipping.");
    return;
  }

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
    await middleware.process(request.raw, reply, {
      skip: () => {},
      replyHtml: html => {
        reply
          .code(200)
          .header("Content-Type", "text/html")
          .send(html);
      },
      replyNotFound: () => {
        reply.callNotFound();
      },
      replyError: err => {
        reply.send(err);
      },
      replyStaticData: data => {
        const type = mime.lookup(request.url);
        if (type) {
          const charset = mime.charsets.lookup(type);
          reply.header("Content-Type", type + (charset ? `; charset=${charset}` : ""));
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
        const type = mime.lookup(name);
        if (type) {
          const charset = mime.charsets.lookup(type);
          reply.header("Content-Type", type + (charset ? `; charset=${charset}` : ""));
        }
        reply.code(200).send(data);
      }
    });
  });
  fastify.use(middleware.devMiddleware);
  fastify.use(middleware.hotMiddleware);
}

module.exports = fastifyPlugin(register, {
  name: "electrode-dev-fastify"
});
