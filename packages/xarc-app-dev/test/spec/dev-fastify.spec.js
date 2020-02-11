"use strict";
const mockRequire = require("mock-require");

describe("dev-fastify", function() {
  let fakeServer;
  let hooks;
  const webpackConfig = {
    devMiddleware: true
  };

  before(() => {
    mockRequire("fastify-plugin", (register, params) => {
      return {
        isMockFastifyPlugin: true,
        register,
        params
      };
    });
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

  it("fastify exports module", () => {
    const fastifyMod = require("../../lib/webpack-dev-fastify");
    expect(fastifyMod.isMockFastifyPlugin).true;
    expect(fastifyMod.params.name).eq("@xarc/app-dev");
    expect(fastifyMod.register).exist;
  });

  it("if WEBPACK_DEV_MIDDLEWARE is not true, skip with console log", () => {
    webpackConfig.devMiddleware = false;
    const fastifyMod = require("../../lib/webpack-dev-fastify");
    expect(fastifyMod.isMockFastifyPlugin).true;
    expect(fastifyMod.register).exist;
    fastifyMod.register(fakeServer);
    expect(hooks.onRequest).not.exist;
  });
  it("on request hook is attached", () => {
    const fastifyMod = require("../../lib/webpack-dev-fastify");
    expect(fastifyMod.isMockFastifyPlugin).true;
    expect(fastifyMod.register).exist;
    fastifyMod.register(fakeServer);
    expect(hooks.onRequest).exist;
  });

  it("calling request hook sets webpackDev", () => {
    const fastifyMod = require("../../lib/webpack-dev-fastify");
    expect(fastifyMod.isMockFastifyPlugin).true;
    expect(fastifyMod.register).exist;
    fastifyMod.register(fakeServer);
    expect(hooks.onRequest).exist;
    const fakeRequest = {
      app: {}
    };
    hooks.onRequest(fakeRequest);
    expect(fakeRequest.app.webpackDev).exist;
  });
});
