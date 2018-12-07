"use strict";

const Path = require("path");
const webpackConfig = require("./webpack.config");

module.exports = function(config) {
  const settings = {
    files: [
      // only specify one entry point
      // and require all tests in there
      "test/entry.js"
    ],

    frameworks: ["mocha"],

    preprocessors: {
      // add webpack as preprocessor
      "test/entry.js": ["webpack"]
    },

    reporters: [
      "spec",
      // "sonarqubeUnit",
      "coverage"
    ],

    // sonarQubeUnitReporter: {
    //   sonarQubeVersion: "5.x",
    //   outputFile: "gunit.xml",
    //   outputDir: Path.resolve("coverage", "client"),
    //   overrideTestDescription: true,
    //   useBrowserName: false
    // },

    coverageReporter: {
      dir: "build/coverage/",
      reporters: [{ type: "html" }, { type: "lcov" }, { type: "text" }, { type: "text-summary" }]
    },

    webpack: webpackConfig,
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
    ]
  };

  config.set(settings);
};
