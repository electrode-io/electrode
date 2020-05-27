"use strict";

const { init } = require("../../lib");
const { resetCdn } = require("../../lib/util");

const Path = require("path");

// test the init token for subapps

describe("init", function () {
  afterEach(() => {
    delete process.env.NODE_ENV;
    delete process.env.APP_SRC_DIR;
  });

  it("should return assets as JSON script and loadJs", () => {
    // point subapp-util to look for subapps under a test dir
    process.env.APP_SRC_DIR = "test/subapps";

    const initToken = init({
      routeOptions: {
        __internals: {},
        cdn: {},
        stats: Path.join(__dirname, "../data/prod-stats.json")
      }
    });

    const context = { user: {} };
    const initJs = initToken.process(context);
    expect(context.user.assets).to.be.ok;
    expect(initJs).contains(`<script id="bundleAssets" type="application/json">`);
    expect(initJs).contains(`<script>/*LJ*/`);
  });

  it("it should load timetime runtime.bundle.js inline and mark includedBundles.runtime to true", () => {
    resetCdn();
    process.env.APP_ROOT_DIR = Path.join(process.cwd(), "test/data/mock-app");
    process.env.NODE_ENV = "development";
    const initToken = init({
      routeOptions: {
        __internals: {},
        cdn: {},
        devBundleBase: "/js",
        prodBundleBase: "/js",
        stats: Path.join(__dirname, "../data/mock-app/dist/stats-with-runtime.json")
      }
    });

    const context = { user: {} };
    const initJs = initToken.process(context);
    console.log(context.user.includedBundles);
    expect(context.user.includedBundles.runtime).to.equal(true);

    expect(initJs).to.contain("/* placeholder */");
    delete process.env.APP_ROOT_DIR;
  });
});
