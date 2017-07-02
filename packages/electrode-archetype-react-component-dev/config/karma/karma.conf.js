"use strict";

var path = require("path");

var webpackCfg = require("../webpack/webpack.config.test");

var MAIN_PATH = require.resolve(
  "electrode-archetype-react-component-dev/config/karma/entry.js"
);

const archetype = require("electrode-archetype-react-component/config/archetype");

var PREPROCESSORS = {};

PREPROCESSORS[MAIN_PATH] = ["webpack"];

module.exports = function(config) {
  const browser = archetype.karma.browser.toLowerCase();
  const base = {
    basePath: process.cwd(),
    files: [MAIN_PATH],
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
    reporters: ["spec", "coverage"],
    browserNoActivityTimeout: 60000,
    coverageReporter: {
      reporters: [
        { type: "json", file: "coverage.json" },
        { type: "lcov" },
        { type: "text" }
      ],
      dir: path.join(process.cwd(), "coverage/client")
    },
    captureTimeout: 100000,
    singleRun: true
  };

  if (browser === "chrome") {
    base.browsers = ["ChromeHeadless"];
    base.frameworks = ["mocha", "intl-shim"];
    console.log("Using Chrome Headless to run Karma test");
  } else {
    base.browsers = ["PhantomJS"];
    base.frameworks = ["mocha", "phantomjs-shim", "intl-shim"];
  }

  config.set(base);
};
