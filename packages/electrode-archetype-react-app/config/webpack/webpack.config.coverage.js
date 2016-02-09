"use strict";
/***
 * Webpack frontend test (coverage) configuration.
 */
const assign = require("lodash/object/assign");

const isparta = require.resolve("isparta-loader");

const config = require("./webpack.config.test");

config.module.preLoaders = [
  // Manually instrument client code for code coverage.
  // https://github.com/deepsweet/isparta-loader handles ES6 + normal JS.
  {
    test: /(test|client)\/.*\.jsx?$/,
    exclude: /node_modules\//,
    loader: isparta + "?{ babel: { stage: 1 } }"
  }
];

module.exports = config;

