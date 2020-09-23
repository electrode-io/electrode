import { describe, it } from "mocha";
import { expect } from "chai";

import { XarcUserConfigs } from "../../src/config/xarc-user-configs";
import * as mockRequire from "mock-require";
/* eslint-disable @typescript-eslint/no-var-requires */
const getArchetype = require("../../config/archetype");
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
    expect(config.AppMode.reactLib).to.equal("react");
    expect(config.babel.hasMultiTargets).to.equal(false);
  });
});
