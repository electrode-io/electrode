"use strict";

var mergeWebpackConfig = require("webpack-partial").default;

var urlLoader = require.resolve("url-loader");
var fileLoader = require.resolve("file-loader");
var isomorphicLoader = require.resolve("isomorphic-loader");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        rules: [
          {
            name: "woff",
            test: /\.(woff|woff2)(\?\S*)?$/i,
            use: [
              {
                loader: urlLoader,
                options: {
                  limit: 10000,
                  mimetype: "application/font-woff"
                }
              },
              isomorphicLoader
            ]
          },
          {
            name: "fonts",
            test: /\.(eot|ttf)(\?\S*)?$/i,
            use: [
              fileLoader,
              isomorphicLoader
            ]
          }
        ]
      }
    });
  };
};
