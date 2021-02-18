/* eslint-disable @typescript-eslint/no-var-requires, no-console */
const Path = require("path");
const customCheck = require("@xarc/webpack/lib/util/custom-check");
import { loadUserConfig } from "./util/load-user-config";
const browserSettings = require("./browser-settings");
const loadElectrodeDll = require("./util/load-electrode-dll");
import { loadXarcOptions } from "../../lib/utils";

/**
 *
 */
function getXarcOptPlugins() {
  try {
    require.resolve("@xarc/opt-karma");
    return [
      "@xarc/opt-karma/plugins/chrome-launcher",
      "@xarc/opt-karma/plugins/coverage",
      "@xarc/opt-karma/plugins/firefox-launcher",
      "@xarc/opt-karma/plugins/ie-launcher",
      "@xarc/opt-karma/plugins/intl-shim",
      "@xarc/opt-karma/plugins/mocha",
      "@xarc/opt-karma/plugins/mocha-reporter",
      "@xarc/opt-karma/plugins/safari-launcher",
      "@xarc/opt-karma/plugins/sonarqube-unit-reporter",
      "@xarc/opt-karma/plugins/sourcemap-loader",
      "@xarc/opt-karma/plugins/spec-reporter",
      "@xarc/opt-karma/plugins/webpack"
    ];
  } catch (err) {
    return false;
  }
}

/**
 *
 */
function getArchetypeOptPlugins() {
  try {
    require.resolve("electrode-archetype-opt-karma");
    return [
      "karma-chrome-launcher",
      "karma-coverage",
      "karma-firefox-launcher",
      "karma-ie-launcher",
      "karma-intl-shim",
      "karma-mocha",
      "karma-mocha-reporter",
      "karma-safari-launcher",
      "karma-sonarqube-unit-reporter",
      "karma-sourcemap-loader",
      "karma-spec-reporter",
      "karma-webpack"
    ];
  } catch (err) {
    return false;
  }
}

let MAIN_PATH;

try {
  const xarcOptions = loadXarcOptions();
  const xarcCwd = xarcOptions.cwd;
  MAIN_PATH = require.resolve(Path.resolve(xarcCwd, "test/karma-entry"));
} catch (err) {
  if (getXarcOptPlugins()) {
    MAIN_PATH = require.resolve("./entry-xarc.js");
  } else {
    MAIN_PATH = require.resolve("./entry.js");
  }
}

console.log(`KARMA will use entry file ${MAIN_PATH}`);

const PREPROCESSORS = {};

PREPROCESSORS[MAIN_PATH] = ["webpack", "sourcemap"];

const DLL_PATHS = loadElectrodeDll().map(x => require.resolve(x));

/**
 *
 */
function loadWebpackConfig() {
  if (!process.env.KARMA_RUN_TYPE) {
    process.env.KARMA_RUN_TYPE = "base";
    return require(customCheck.getWebpackStartConfig(
      "@xarc/webpack/lib/webpack.config.test",
      false
    ));
  }

  return {};
}

/**
 * get karma config
 *
 * @param config
 * @returns {void} karma config
 */
export = function getKarmaConfig(config): any {
  let plugins = getXarcOptPlugins() || getArchetypeOptPlugins();
  if (!plugins) {
    console.error("ERROR: @xarc/opt-karma not found - running karma tests is not possible");
    plugins = [];
  }
  const xarcOptions = loadXarcOptions();
  const xarcCwd = xarcOptions.cwd;
  const settings = {
    basePath: xarcCwd,
    frameworks: ["mocha", "intl-shim"],
    files: DLL_PATHS.concat(MAIN_PATH),
    plugins,
    preprocessors: PREPROCESSORS,
    webpack: loadWebpackConfig(),
    webpackServer: {
      port: 3002, // Choose a non-conflicting port (3000 app, 3001 test dev)
      quiet: false,
      noInfo: true,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    reporters: ["spec", "sonarqubeUnit", "coverage"],
    browserNoActivityTimeout: 60000,
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
    },
    captureTimeout: 100000,
    singleRun: true
  };

  browserSettings(settings);
  loadUserConfig(Path.basename(__filename), config, settings);
};
