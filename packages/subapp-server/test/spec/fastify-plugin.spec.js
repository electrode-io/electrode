"use strict";

const { fastifyPlugin } = require("../../lib/fastify-plugin");
const Path = require("path");
const { runFinally, asyncVerify } = require("run-verify");

describe("fastify-plugin", function () {
  it("loads server from file system", async () => {
    const server = await require("@xarc/fastify-server")({
      deferStart: true,
      connection: { port: 3004 }
    });

    const opts = {
      srcDir: Path.join(__dirname, "../data/fastify-plugin-test"),
      loadRoutesFrom: "routes.js",
      stats: Path.join(__dirname, "../data/stats.json") // "dist/server/stats.json"
    };
    return asyncVerify(
      () => fastifyPlugin(server, opts),
      () => server.start(),
      () => {
        server
          .inject({
            method: "GET",
            url: "/",
            port: 2222
          })
          .then(res => {
            expect(res.statusCode).to.equal(200);
          });
      },
      () => {
        server
          .inject({
            method: "POST",
            url: "/"
          })
          .then(res => {
            it("throws 404 respomse", function () {
              expect(res.statusCode).to.equal(404);
            });
          });
      },
      runFinally(() => server.close())
    );
  });

  it("preserves original end points", async function () {
    const server = await require("@xarc/fastify-server")({
      deferStart: true
    });
    server.route({
      method: "GET",
      path: "/",
      handler: async () => "Hello World"
    });
    server.route({
      method: "GET",
      path: "/500",
      handler: () => {
        throw new Error("db error");
      }
    });

    asyncVerify(
      () => fastifyPlugin(server, {}),
      () => server.start(),
      async () => {
        const { result, responseCode } = await server.inject({ path: "/" });
        expect(responseCode).to.equal(200);
        expect(result).to.equal("Hello World");
      },
      () => {
        it("responds with 'Internal Server Error' when node env is production", async () => {
          process.env.NODE_ENV = "production";
          const { result, responseCode } = await server.inject({ path: "/500" });
          expect(result).to.equal("Internal Server Error");
          expect(responseCode).to.equal(500);
        });
        it("responds with error message when node env is not production ", async () => {
          process.env.NODE_ENV = "developement";
          const { result, responseCode } = await server.inject({ path: "/500" });
          expect(result).to.contain("db error");
          expect(responseCode).to.equal(500);
        });
      },
      runFinally(() => server.close())
    );
  });
});
