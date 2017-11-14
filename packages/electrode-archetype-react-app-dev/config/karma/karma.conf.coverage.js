"use strict";

/*
 * Karma Configuration: "coverage" version.
 *
 * This configuration is the same as basic one-shot version, just with coverage.
 */
const webpackCovCfg = require("../webpack/webpack.config.coverage");
const karmaConf = require("./karma.conf");
const loadUserConfig = require("./util/load-user-config");
const Path = require("path");

module.exports = function(config) {
  karmaConf(config);
  const settings = {
    reporters: ["spec", "coverage"],
    webpack: webpackCovCfg,
    coverageReporter: {
      reporters: [
        { type: "json", subdir: ".", file: "coverage.json" },
        { type: "lcov", subdir: "." },
        { type: "text", subdir: "." }
      ],
      dir: Path.resolve("coverage", "client")
    }
  };

  loadUserConfig(Path.basename(__filename), config, settings);
};
