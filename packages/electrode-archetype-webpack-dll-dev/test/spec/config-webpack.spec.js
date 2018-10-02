"use strict";

const xsh = require("xsh");

describe("config webpack", function() {
  afterEach(() => {
    try {
      xsh.$.popd();
    } catch (e) {
      //
    }
  });
  it("should generate webpack config", () => {
    xsh.$.pushd("test/fixtures/dll-test");
    const webpackDevConfig = require("../../config/webpack/webpack.config.dev");
    expect(webpackDevConfig.entry.react).to.deep.equal(["./src/dll-react.js"]);
  });
});
