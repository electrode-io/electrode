/* eslint-disable @typescript-eslint/no-var-requires */
process.env.KARMA_RUN_TYPE = "coverage";

import Path from "path";

/*
 * Karma Configuration: "coverage" version.
 *
 * This configuration is the same as basic one-shot version, just with coverage.
 */
const karmaConf = require("./karma.conf");
import { loadUserConfig } from "./util/load-user-config";
const customCheck = require("@xarc/webpack/lib/util/custom-check");
const webpackCovCfg = require(customCheck.getWebpackStartConfig(
  "../webpack/webpack.config.coverage",
  false
));
import { loadXarcOptions } from "../../lib/utils";

export = function(config) {
  const xarcOptions = loadXarcOptions();
  const xarcCwd = xarcOptions.cwd;

  karmaConf(config);
  const settings = {
    reporters: ["spec", "sonarqubeUnit", "coverage"],
    webpack: webpackCovCfg,
    coverageReporter: {
      reporters: [
        { type: "json", subdir: ".", file: "coverage.json" },
        { type: "lcov", subdir: "." },
        { type: "text", subdir: "." }
      ],
      dir: Path.resolve(xarcCwd, "coverage", "client")
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: "5.x",
      outputFile: "gunit.xml",
      outputDir: Path.resolve(xarcCwd, "coverage", "client"),
      useBrowserName: false
    }
  };

  loadUserConfig(Path.basename(__filename), config, settings);
};
