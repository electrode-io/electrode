import { describe, it } from "mocha";
import { expect } from "chai";
import { XarcUserConfigs } from "../../src/config/xarc-user-configs";
import * as mockRequire from "mock-require";
/* eslint-disable @typescript-eslint/no-var-requires */
const getArchetype = require("../../src/config/archetype");
// const loadArchetype = require("../../src/lib/load-xrun-tasks");

describe("getDevArchetype", () => {
  it("combines defaults with package.json's content to determine optional packages", () => {
    mockRequire("../../src/lib/utils", {
      getMyPkg: () => {
        console.log("........MOCKREQUIRE....");
        return {
          dependencies: {
            "@xarc/opt-sass": {}
          }
        };
      }
    });
    const userConfig: XarcUserConfigs = {
      enableFeatures: true,
      electrodePackages: ["@xarc/opt-sass"],
      options: {
        reactLib: "preact",
        sass: true
      }
    };
    const config = getArchetype(userConfig);
    expect(config.devPkg.packageJson).to.exist;
    expect(config.options.sass).to.equal(true);
    expect(config.AppMode.reactLib).to.equal("preact");
    expect(config.babel.hasMultiTargets).to.equal(false);
  });

  it("runs when no config is given", () => {
    const config = getArchetype();
    expect(config.options.reactLib).to.equal("react");
  });

  it("loads optionally webpack configs", () => {
    const userConfig: XarcUserConfigs = {
      webpack: {
        webpackDev: true
      }
    };
    const config = getArchetype(userConfig);
    expect(config.webpack.webpackDev).to.equal(true);
    expect(process.env.WEBPACK_DEV).to.equal("true");
  });
});

// describe("load-tasks", () => {
//   let xclap;
//   beforeEach(() => {
//     xclap = require("@xarc/run");
//   });
//   it("loads tools into xrun cli", () => {
//     loadArchetype(xclap);
//   });
// });
