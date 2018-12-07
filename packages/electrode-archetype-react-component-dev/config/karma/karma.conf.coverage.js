"use strict";

/*
 * Karma Configuration: "coverage" version.
 *
 * This configuration is the same as basic one-shot version, just with coverage.
 */

process.env.KARMA_RUN_TYPE = "coverage";

const webpackCovCfg = require("../webpack/webpack.config.coverage");
const baseConf = require("./karma.conf");

module.exports = function(config) {
  baseConf(config);
  config.set({
    reporters: ["spec", "coverage"],
    webpack: webpackCovCfg,
    coverageReporter: {
      reporters: [{ type: "json", file: "coverage.json" }, { type: "lcov" }, { type: "text" }],
      dir: "coverage/client"
    }
  });
};
