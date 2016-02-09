const path = require("path");
const karmaConf = require("./karma.conf");

/*
 * Karma Configuration: "coverage" version.
 *
 * This configuration is the same as basic one-shot version, just with coverage.
 */
const webpackCovCfg = require("../webpack/webpack.config.coverage");

module.exports = function (config) {
  karmaConf(config);
  config.set({
    reporters: ["spec", "coverage"],
    webpack: webpackCovCfg,
    coverageReporter: {
      reporters: [
        { type: "json", file: "coverage.json" },
        { type: "lcov" },
        { type: "text" }
      ],
      dir: path.join(process.cwd(), "coverage/client")
    }
  });
};
