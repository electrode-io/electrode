"use strict";

var archetype = require("../../archetype");
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
            test: /\.(woff|woff2)(\?\S*)?$/i,
            loader: urlLoader + "?limit=10000&mimetype=application/font-woff!isomorphic"
          },
          {
            name: "fonts",
            test: /\.(eot|ttf)(\?\S*)?$/i,
            loader: fileLoader + "!isomorphic"
          }
        ]
      }
    });
  };
};
