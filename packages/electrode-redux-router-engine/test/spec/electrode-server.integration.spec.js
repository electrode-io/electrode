"use strict";

const ReduxRouterEngine = require("../..");
const expect = require("chai").expect;
const electrodeServer = require("electrode-server");
const { runFinally, asyncVerify } = require("run-verify");
const streamToArray = require("stream-to-array");

require("babel-register");

const routes = require("../routes.jsx").default;

describe("electrode server (Hapi) integration", function() {
  const setupServer = async (streaming, withIds) => {
    let engine;

    const server = await electrodeServer({
      electrode: { logLevel: "none" },
      connections: { default: { port: 0 } }
    });

    server.route({
      method: "get",
      path: "/test",
      handler: async (request, reply) => {
        if (!engine) engine = new ReduxRouterEngine({ routes, streaming, withIds });
        const result = await engine.render(request);
        if (streaming) {
          result.resultType = result.html.constructor.name;
          streamToArray(result.html, (err, arr) => {
            result.html = arr.join("");
            reply(result);
          });
        } else {
          reply(result);
        }
      }
    });

    return server;
  };

  const closeServer = server => {
    return (
      server &&
      new Promise(resolve => {
        server.stop(resolve);
      })
    );
  };

  it("should render basic test route", () => {
    let server;
    return asyncVerify(
      () => setupServer(),
      s => {
        server = s;
        return server.inject("/test").then(resp => {
          expect(resp.result).to.deep.equal({
            status: 200,
            html: "<div>Page<div>Home</div></div>",
            prefetch: "window.__PRELOADED_STATE__ = {};"
          });
        });
      },
      runFinally(() => closeServer(server))
    );
  });

  it("should render with URL query", () => {
    let server;
    return asyncVerify(
      () => setupServer(),
      s => {
        server = s;
        return server.inject("/test?foo=bar").then(resp => {
          expect(resp.result).to.deep.equal({
            status: 200,
            html: "<div>Page<div>Home - Query: ?foo=bar</div></div>",
            prefetch: "window.__PRELOADED_STATE__ = {};"
          });
        });
      },
      runFinally(() => closeServer(server))
    );
  });

  it("should render static with streaming", () => {
    let server;
    return asyncVerify(
      () => setupServer(true),
      s => {
        server = s;
        return server.inject("/test").then(resp => {
          expect(resp.result).to.deep.equal({
            status: 200,
            html: "<div>Page<div>Home</div></div>",
            prefetch: "window.__PRELOADED_STATE__ = {};",
            resultType: "ReactMarkupReadableStream"
          });
        });
      },
      runFinally(() => closeServer(server))
    );
  });

  it("should render with ids and streaming", () => {
    let server;
    return asyncVerify(
      () => setupServer(true, true),
      s => {
        server = s;
        return server.inject("/test").then(resp => {
          expect(resp.result).to.deep.equal({
            status: 200,
            html: `<div>Page<div>Home</div></div>`,
            prefetch: "window.__PRELOADED_STATE__ = {};",
            resultType: "ReactMarkupReadableStream"
          });
        });
      },
      runFinally(() => closeServer(server))
    );
  });
});
