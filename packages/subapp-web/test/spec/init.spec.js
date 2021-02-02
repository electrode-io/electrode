"use strict";

const { init } = require("../../lib");
const { resetCdn } = require("../../lib/util");
const { asyncVerify, runFinally } = require("run-verify");

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
        __internals: {
          subApps: [
            {
              subapp: {
                name: "mainbody"
              }
            }
          ]
        },
        cdn: {},
        stats: Path.join(__dirname, "../data/prod-stats.json")
      }
    });

    const context = { user: {} };
    const initJs = initToken.process(context);
    expect(context.user.assets).to.be.ok;
    expect(initJs).contains(`<script id="bundleAssets" type="application/json">`);
    expect(initJs).contains(`<script>/*LJ*/`);
    expect(initJs).not.contains(`window.__default__namespace="testNameSpace";`);
  });

  it("should return assets as JSON script and loadJs for a given namespace", () => {
    // point subapp-util to look for subapps under a test dir
    process.env.APP_SRC_DIR = "test/subapps";

    const initToken = init({
      routeOptions: {
        namespace: "testNameSpace",
        __internals: {
          subApps: [
            {
              subapp: {
                name: "mainbody"
              }
            }
          ]
        },
        cdn: {},
        stats: Path.join(__dirname, "../data/prod-stats.json")
      }
    });

    const context = { user: {} };
    const initJs = initToken.process(context);
    expect(context.user.assets).to.be.ok;
    expect(initJs).contains(`<script id="testNameSpaceAssets" type="application/json">`);
    expect(initJs).contains(`<script>/*LJ*/`);
    expect(initJs).contains(`window.__default__namespace="testNameSpace";`);
  });

  it("it should load runtime.bundle.js inline and mark includedBundles.runtime to true", () => {
    resetCdn();
    process.env.NODE_ENV = "production";
    const originalWd = process.cwd();
    process.chdir(Path.join(__dirname, "../subapps"));
    process.env.APP_SRC_DIR = "subapp1/..";

    const initToken = init({
      routeOptions: {
        __internals: {
          subApps: [
            {
              subapp: {
                name: "mainbody"
              }
            }
          ]
        },
        cdn: {},
        prodBundleBase: "/js",
        stats: Path.join(__dirname, "../data/prod-stats.json")
      }
    });

    return asyncVerify(
      () => {
        const context = { user: {} };
        const initJs = initToken.process(context);
        expect(Object.keys(context.user.includedBundles).length).to.equal(1);
        const loadedBundles = Object.keys(context.user.includedBundles);
        const markLoadedStr = `markBundlesLoaded(${JSON.stringify(loadedBundles)})`;
        expect(initJs).to.contain(markLoadedStr);
        expect(initJs).to.contain("/* placeholder */");
      },
      runFinally(() => process.chdir(originalWd))
    );
  });

  it("it should load runtime.bundle.js inline and mark includedBundles.runtime to true for a given namespace", () => {
    resetCdn();
    process.env.NODE_ENV = "production";
    const originalWd = process.cwd();
    process.chdir(Path.join(__dirname, "../subapps"));
    process.env.APP_SRC_DIR = "subapp1/..";

    const initToken = init({
      routeOptions: {
        namespace: "testNameSpace",
        __internals: {
          subApps: [
            {
              subapp: {
                name: "mainbody"
              }
            }
          ]
        },
        cdn: {},
        prodBundleBase: "/js",
        stats: Path.join(__dirname, "../data/prod-stats.json")
      }
    });

    return asyncVerify(
      () => {
        const context = { user: {} };
        const initJs = initToken.process(context);
        expect(Object.keys(context.user.includedBundles).length).to.equal(1);
        const loadedBundles = Object.keys(context.user.includedBundles);
        const markLoadedStr = `markBundlesLoaded(${JSON.stringify(
          loadedBundles
        )}, "testNameSpace")`;
        expect(initJs).to.contain(markLoadedStr);
        expect(initJs).to.contain("/* placeholder */");
      },
      runFinally(() => process.chdir(originalWd))
    );
  });
});
