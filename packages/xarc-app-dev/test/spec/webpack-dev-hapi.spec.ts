/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-ignore, no-invalid-this, @typescript-eslint/class-name-casing */

const hapiCompat = require("electrode-hapi-compat");

const moduleName = "../../src/lib/webpack-dev-hapi";

import { asyncVerify, runFinally } from "run-verify";
import { expect } from "chai";
import { before, beforeEach, describe, it, after, afterEach } from "mocha";
const electrodeServer = require("e1");

describe("dev-hapi 16", function() {
  this.timeout(10000);

  before(() => {
    hapiCompat.hapiVersion = 16;
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
        debugger;
        reply("DONE");
      }
    });
    return data;
  };

  const testPlugin16 = options => {
    let server, data;
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

  it.only("should allow registering the webpack dev plugin for hapi <=16", () => {
    return testPlugin16({
      plugins: {
        "webpack-dev": {
          module: moduleName,
          requireFromPath: __dirname
        }
      }
    });
  });

  // it("should allow using the hapi17 register function directly", () => {
  //   return testPlugin17({
  //     plugins: {
  //       "webpack-dev": {
  //         register: ver17Register
  //       }
  //     }
  //   });
  // });
});
