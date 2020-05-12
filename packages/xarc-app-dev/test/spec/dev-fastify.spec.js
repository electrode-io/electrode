"use strict";
const mockRequire = require("mock-require");

describe("dev-fastify", function() {
  let fakeServer;
  let hooks;
  const webpackConfig = {
    devMiddleware: true
  };

  before(() => {
    mockRequire("@xarc/app/config/archetype", {
      webpack: webpackConfig
    });
  });

  beforeEach(() => {
    hooks = {};
    webpackConfig.devMiddleware = true;
    fakeServer = {
      addHook: (event, func) => {
        hooks[event] = func;
      }
    };
  });

  it("on request hook is attached", () => {
    const fastifyMod = require("../../lib/webpack-dev-fastify");
    fastifyMod(fakeServer);
    expect(hooks.onRequest).exist;
  });

  it("calling request hook sets webpackDev", () => {
    const fastifyMod = require("../../lib/webpack-dev-fastify");
    fastifyMod(fakeServer);
    expect(hooks.onRequest).exist;
    const fakeRequest = { app: {} };
    hooks.onRequest(fakeRequest);
    expect(fakeRequest.app.webpackDev).exist;
  });
});
