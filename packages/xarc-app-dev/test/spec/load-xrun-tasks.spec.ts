import { before, beforeEach, describe, it, after, afterEach } from "mocha";
import { expect } from "chai";

import { CreateXarcOptions, XarcUserConfigs } from "../../src/xarc-user-configs";
const {
  getOptArchetypeRequire,
  formUrl,
  getXarcOptions,
  checkUserBabelRc,
  getMyPkg
} = require("../../src/lib/utils");

const mockRequire = require("mock-require");

const getDevArchetype = require("../../src/config/archetype");
const {
  checkOptArchetypeInAppDep,
  getUserConfigOptions,
  getDefaultArchetypeOptions
} = require("../../src/config/options");

describe("load-xrun-tasks", () => {
  it("calls getXarcOptions to determined package options", () => {
    const createXarcOptions = getXarcOptions({
      electrodePackages: ["@xarc/opt-karma"],
      enableFeatures: false
    });
    expect(createXarcOptions.electrodePackages).to.include("@xarc/opt-karma");
    expect(createXarcOptions.enableFeatures).to.be.false;
    expect(getXarcOptions({}).enableFeatures).to.be.true;
  });
});

describe("getDevArchetype", () => {
  it("combines defaults with package.json's content to determine optional packages", () => {
    mockRequire("../../src/lib/utils", {
      getMyPkg: () => {
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
        reactLib: "preact"
      }
    };
    const config = getDevArchetype(userConfig);

    expect(config.pkg.packageJson).to.exist;
    expect(config.options.sass).to.equal(true);
    expect(config.AppMode.reactLib).to.equal("react");
    expect(config.babel.hasMultiTargets).to.equal(false);
  });
});
