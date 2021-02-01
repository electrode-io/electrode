/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-empty-function */
/* eslint-disable no-invalid-this, no-magic-numbers, prefer-arrow-callback */

const moduleName = "../../src/lib/index";

import { asyncVerify, runFinally } from "run-verify";
import { expect } from "chai";
import { before, beforeEach, describe, it, after, afterEach } from "mocha";
const electrodeServer = require("e1");

describe("dev-hapi 16", function() {
  this.timeout(10000);

  before(() => {
    //
  });

  beforeEach(() => {
    delete require.cache[require.resolve(moduleName)];
  });

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
      handler: (request, reply) => {
        data.request = request;
        data.called = true;
        reply("DONE");
      }
    });
    return data;
  };

  const testPlugin16 = options => {
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

  it("should allow registering the webpack dev plugin with electrode-server for hapi <=16", () => {
    return testPlugin16({
      plugins: {
        "webpack-dev": {
          module: moduleName,
          requireFromPath: __dirname
        }
      }
    });
  });
});
