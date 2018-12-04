"use strict";

const Path = require("path");
const MAIN_PATH = require.resolve("./entry.js");
const browserSettings = require("./browser-settings");

const PREPROCESSORS = { [MAIN_PATH]: ["webpack"] };

function loadWebpackConfig() {
  if (!process.env.KARMA_RUN_TYPE) {
    process.env.KARMA_RUN_TYPE = "base";
    return require("../webpack/webpack.config.test");
  }

  return {};
}

module.exports = function(config) {
  const base = {
    basePath: process.cwd(),
    frameworks: ["mocha", "intl-shim"],
    files: [MAIN_PATH],
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
    browserNoActivityTimeout: 60000,
    captureTimeout: 100000,
    singleRun: true
  };

  browserSettings(base);

  config.set(base);
};
