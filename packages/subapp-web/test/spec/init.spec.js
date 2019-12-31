"use strict";

const { init } = require("../../lib");
const Path = require("path");

// test the init token for subapps

describe("init", function() {
  afterEach(() => {
    delete process.env.NODE_ENV;
    delete process.env.APP_SRC_DIR;
  });

  it("should return assets as JSON script and little loader", () => {
    // point subapp-util to look for subapps under a test dir
    process.env.APP_SRC_DIR = "test/subapps";

    const initToken = init({
      routeOptions: {
        __internals: {},
        stats: Path.join(__dirname, "../data/prod-stats.json")
      }
    });

    const context = { user: {} };
    const initJs = initToken.process(context);
    expect(context.user.assets).to.be.ok;
    expect(initJs).contains(`<script id="bundleAssets" type="application/json">`);
    expect(initJs).contains(`<script>/*LL*/`);
  });
});
