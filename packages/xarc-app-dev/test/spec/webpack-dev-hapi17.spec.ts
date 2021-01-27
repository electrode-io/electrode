/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-ignore, no-invalid-this, @typescript-eslint/class-name-casing */

const { hapi17Plugin } = require("../../src/lib/webpack-dev-hapi17");

const moduleName = "../../src/lib/index";

import { asyncVerify, runFinally } from "run-verify";
import { expect } from "chai";
import { before, beforeEach, describe, it, after, afterEach } from "mocha";
const electrodeServer = require("electrode-server");

describe("dev-hapi 17", function() {
  this.timeout(10000);

  before(() => {
    //
  });

  beforeEach(() => {});

  afterEach(() => {
    delete require.cache[require.resolve(moduleName)];
  });

  after(() => {
    //
  });

  const captureRequest = server => {
    const data: any = {};
    server.route({
      method: "GET",
      path: "/test",
      handler: (request, h) => {
        data.request = request;
        data.called = true;
        return "DONE";
      }
    });
    return data;
  };

  const testPlugin17 = options => {
    let server;
    let data;
    return asyncVerify(
      () => electrodeServer(options),
      s => {
        server = s;
        data = captureRequest(server);

        return server.inject("/test");
      },
      resp => {
        expect(resp.statusCode).to.equal(200);
        expect(data.request.app)
          .to.have.key("webpackDev")
          .that.is.an("object");
      },
      runFinally(() => server.stop())
    );
  };

  it("should allow registering the webpack dev plugin for hapi >=18", () => {
    return testPlugin17({
      plugins: {
        "webpack-dev": {
          module: moduleName,
          requireFromPath: __dirname
        }
      }
    });
  });

  it("should allow using the hapi17 register function directly", () => {
    return testPlugin17({
      plugins: {
        "webpack-dev": hapi17Plugin
      }
    });
  });
});
