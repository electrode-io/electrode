"use strict";

const Path = require("path");

const webpackCfg = require("../webpack/webpack.config.test");

const MAIN_PATH = require.resolve("./entry.js");

const PREPROCESSORS = {};

const loadUserConfig = require("./util/load-user-config");

const browserSettings = require("./browser-settings");

PREPROCESSORS[MAIN_PATH] = ["webpack", "sourcemap"];

const loadElectrodeDll = require("./util/load-electrode-dll");

const DLL_PATHS = loadElectrodeDll().map(x => require.resolve(x));

module.exports = function(config) {
  const settings = {
    basePath: process.cwd(),
    frameworks: ["mocha", "intl-shim"],
    files: DLL_PATHS.concat(MAIN_PATH),
    plugins: [
      "karma-chrome-launcher",
      "karma-coverage",
      "karma-firefox-launcher",
      "karma-ie-launcher",
      "karma-intl-shim",
      "karma-mocha",
      "karma-mocha-reporter",
      "karma-phantomjs-shim",
      "karma-phantomjs-launcher",
      "karma-safari-launcher",
      "karma-sonarqube-unit-reporter",
      "karma-sourcemap-loader",
      "karma-spec-reporter",
      "karma-webpack"
    ],
    preprocessors: PREPROCESSORS,
    webpack: webpackCfg,
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
      dir: Path.resolve("coverage", "client")
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: "5.x",
      outputFile: "gunit.xml",
      outputDir: Path.resolve("coverage", "client"),
      overrideTestDescription: true,
      useBrowserName: false
    },
    captureTimeout: 100000,
    singleRun: true
  };

  browserSettings(settings);
  loadUserConfig(Path.basename(__filename), config, settings);
};
