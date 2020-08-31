"use strict";

import { init } from "../../libsrc";
import util from "../../libsrc/util";
import { asyncVerify, runFinally } from "run-verify";
import * as Path from "path";
import { expect } from "chai";

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
    // @ts-ignore
    expect(context.user.assets).to.be.ok;
    expect(initJs).contains(`<script id="bundleAssets" type="application/json">`);
    expect(initJs).contains(`<script>/*LJ*/`);
  });

  it("it should load runtime.bundle.js inline and mark includedBundles.runtime to true", () => {
    util.resetCdn();
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
      function init(dummy?: any) {
        const context = { user: {} };
        const initJs = initToken.process(context);
        // @ts-ignore
        expect(Object.keys(context.user.includedBundles).length).to.equal(1);
        // @ts-ignore
        const loadedBundles = Object.keys(context.user.includedBundles);
        const markLoadedStr = `markBundlesLoaded(${JSON.stringify(loadedBundles)})`;
        expect(initJs).to.contain(markLoadedStr);
        expect(initJs).to.contain("/* placeholder */");
      },
      runFinally(() => process.chdir(originalWd))
    );
  });
});
