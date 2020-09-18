import { before, beforeEach, describe, it, after, afterEach } from "mocha";
import { expect } from "chai";
import { AppDevArchetype, defaultArchetypeOptions } from "../../src/lib/app-dev-archetype";
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
  it("calls getXarcOptions to combine defaultCreateOptions and UserXarcOptions", () => {
    const createXarcOptions = getXarcOptions({
      webpack: {
        devPort: 3000
      },
      electrodePackages: ["@xarc/opt-karma"]
    });
    expect(createXarcOptions.webpack.devPort).to.equal(3000);
    expect(createXarcOptions.electrodePackages).to.include("@xarc/opt-karma");
  });

  it("user can specifify optional features in electrode packages", () => {
    debugger;
    const config = getDevArchetype({
      enableFeature: true,
      electrodePackages: ["@xarc/opt-sass"],
      options: {
        typescript: true
      }
    });
    console.log(config);
    expect(config.pkg.packageJson).to.exist;
    expect(config.options.sass).to.equal(true);
  });
});
