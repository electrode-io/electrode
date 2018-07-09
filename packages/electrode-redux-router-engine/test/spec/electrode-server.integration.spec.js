"use strict";

const ReduxRouterEngine = require("../..");
const expect = require("chai").expect;
const electrodeServer = require("electrode-server");

require("babel-register");

const routes = require("../routes.jsx").default;

describe("electrode server (Hapi) integration", function() {
  let server;
  let engine;

  before(async () => {
    server = await electrodeServer({
      electrode: { logLevel: "none" },
      connections: { default: { port: 0 } }
    });
    server.route({
      method: "get",
      path: "/test",
      handler: async (request, reply) => {
        if (!engine) engine = new ReduxRouterEngine({ routes });
        const result = await engine.render(request);
        reply(result);
      }
    });
  });

  after(done => {
    server.stop(done);
  });

  it("should render basic test route", () => {
    return server.inject("/test").then(resp => {
      expect(resp.result).to.deep.equal({
        status: 200,
        html: "<div>Page<div>Home</div></div>",
        prefetch: "window.__PRELOADED_STATE__ = {};"
      });
    });
  });

  it("should render with URL query", () => {
    return server.inject("/test?foo=bar").then(resp => {
      expect(resp.result).to.deep.equal({
        status: 200,
        html: "<div>Page<div>Home - Query: ?foo=bar</div></div>",
        prefetch: "window.__PRELOADED_STATE__ = {};"
      });
    });
  });
});
