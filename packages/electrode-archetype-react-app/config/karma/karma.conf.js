"use strict";
var Path = require("path");

var webpackCfg = require("../webpack/webpack.config.test");

var MAIN_PATH = Path.join(__dirname, "/entry.js");

var PREPROCESSORS = {};

PREPROCESSORS[MAIN_PATH] = ["webpack", "sourcemap"];

module.exports = function (config) {
  config.set({
    basePath: process.cwd(),
    frameworks: ["mocha", "phantomjs-shim"],
    files: [
      MAIN_PATH
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
    browsers: ["PhantomJS"],
    reporters: ["spec", "coverage"],
    browserNoActivityTimeout: 60000,
    coverageReporter: {
      reporters: [
        {type: "json", file: "coverage.json"},
        {type: "lcov"},
        {type: "text"}
      ],
      dir: Path.join(process.cwd(), "coverage/client")
    },
    captureTimeout: 100000,
    singleRun: true
  });
};
