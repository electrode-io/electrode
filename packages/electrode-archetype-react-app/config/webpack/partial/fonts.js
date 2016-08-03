"use strict";

var archetype = require("../../archtype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

var urlLoader = archetype.devRequire.resolve("url-loader");
var fileLoader = archetype.devRequire.resolve("file-loader");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [
          {
            name: "woff",
            test: /\.woff(2)?$/i,
            loader: urlLoader + "?limit=10000&mimetype=application/font-woff!isomorphic"
          },
          {
            name: "fonts",
            test: /\.(ttf|eot)$/i,
            loader: fileLoader + "!isomorphic"
          }
        ]
      }
    });
  };
};
