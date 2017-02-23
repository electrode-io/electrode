"use strict";

const mergeWebpackConfig = require("webpack-partial").default;

const urlLoader = require.resolve("url-loader");
const fileLoader = require.resolve("file-loader");
const isomorphicLoader = require.resolve("isomorphic-loader");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        rules: [
          {
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
