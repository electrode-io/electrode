"use strict";

/*
 * Karma Configuration: "dev" version.
 *
 * This configuration relies on a `webpack-dev-server` already running and
 * bundling `webpack.config.test.js` on port 3001. If this is not running,
 * then the alternate `karma.conf.js` file will _also_ run the webpack dev
 * server during the test run.
 */
module.exports = function (config) {
  config.set({
    frameworks: ["mocha", "phantomjs-shim"],
    reporters: ["spec"],
    browsers: ["PhantomJS"],
    basePath: process.cwd(), // repository root.
    files: [
      // Sinon has issues with webpack. Do global include.
      require.resolve("sinon/pkg/sinon"),
      // Test bundle (must be created via `npm run dev|hot|server-test`)
      "http://127.0.0.1:8080/assets/bundle.js"
    ],
    port: 9999,
    singleRun: true,
    client: {
      mocha: {
        ui: "bdd"
      }
    },
    plugins: [
      require("karma-mocha"),
      require("karma-spec-reporter"),
      require("karma-phantomjs-shim"),
      require("karma-phantomjs-launcher")
    ]
  });
};
