"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;
var cdnLoader = archDevRequire.resolve("@walmart/cdn-file-loader");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "images",
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: cdnLoader + "?limit=10000!isomorphic"
        }]
      }
    });
  };
};
