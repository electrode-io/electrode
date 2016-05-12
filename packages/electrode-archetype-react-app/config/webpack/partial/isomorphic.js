"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var IsomorphicLoaderPlugin = archDevRequire("isomorphic-loader/lib/webpack-plugin");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new IsomorphicLoaderPlugin({
          assetsFile: "../isomorphic-assets.json",
          webpackDev: {
            url: "http://dev.walmart.com:2992",
            addUrl: false
          }
        })
      ]
    });
  };
};
