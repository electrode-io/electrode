"use strict";

const { fastifyPlugin } = require("../../lib/fastify-plugin");
const Path = require("path");
const { runFinally, asyncVerify } = require("run-verify");
const http = require("http");

describe("fastify-plugin", function () {
  it("loads server from file system", async () => {
    const server = await require("@xarc/fastify-server")({
      deferStart: true,
      connection: { port: 3002, host: "localhost" }
    });

    const opt = {
      srcDir: Path.join(__dirname, "../data/fastify-plugin-test"),
      loadRoutesFrom: "routes.js",
      stats: Path.join(__dirname, "../data/stats.json") // "dist/server/stats.json"
    };
    return asyncVerify(
      () => fastifyPlugin(server, opt),
      () => server.start(),
      () => {},
      () => {
        http.get("http://localhost:3002/", res => {
          expect(res.statusCode).to.equal(200);
          let data = "";
          res.on("data", chunk => (data += chunk));
          res.on("done", () => {
            expect(data.to.contain("hello"));
          });
        });
      },
      runFinally(() => server.close())
    );
  });

  it("preserves original end points", async function () {
    const server = await require("@xarc/fastify-server")({
      deferStart: true,
      connection: { port: 3002, host: "localhost" }
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
      () => {
        http.get("http://localhost:3002/", res => {
          expect(res.statusCode).to.equal(200);
          let data = "";
          res.on("data", chunk => (data += chunk));
          res.on("done", () => {
            expect(data.to.contain("Hello World"));
          });
        });
      },
      runFinally(() => server.close())
    );
  });
});
