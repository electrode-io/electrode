/* eslint-disable @typescript-eslint/no-var-requires, callback-return, global-require */
/* eslint-disable no-unused-expressions, @typescript-eslint/ban-ts-ignore */

const mockRequire = require("mock-require");
import { describe, it, before, beforeEach } from "mocha";
import { expect } from "chai";

describe("dev-fastify", function() {
  let fakeServer;
  let hooks;
  const webpackConfig = {
    devMiddleware: true
  };

  before(() => {
    mockRequire("@xarc/app/config/archetype", () => ({
      webpack: webpackConfig
    }));
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
    const fastifyMod = require("../../src/lib/webpack-dev-fastify");
    fastifyMod(fakeServer);
    expect(hooks.onRequest).exist;
  });

  it("calling request hook sets webpackDev", () => {
    const fastifyMod = require("../../src/lib/webpack-dev-fastify");
    fastifyMod(fakeServer);
    expect(hooks.onRequest).exist;
    const fakeRequest = { app: {} };
    hooks.onRequest(fakeRequest);
    // @ts-ignore
    expect(fakeRequest.app.webpackDev).exist;
  });
});
