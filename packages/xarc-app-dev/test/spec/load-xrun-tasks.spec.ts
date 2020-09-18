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

  it("calls getDefaultArchetypeOptions to determine which packaes to use", () => {
    const result = getDefaultArchetypeOptions(
      getXarcOptions({
        electrodePackages: ["@xarc/opt-mocha"]
      })
    );
    console.log(result);
    expect(result.options.opions.mocha).to.equal(true);
  });

  it("user can specifify optional features in electrode packages", () => {
    const config = getDevArchetype({
      enableFeatures: true,
      electrodePackages: ["@xarc/opt-sass"],
      options: {
        typescript: true
      }
    });
    console.log(config);
    expect(config.pkg.packageJson).to.exist;
    expect(config.options.sass).to.equal(false);
  });
});
