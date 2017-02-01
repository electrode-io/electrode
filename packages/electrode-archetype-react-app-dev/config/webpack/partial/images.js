"use strict";

var archetype = require("../../archetype");
var mergeWebpackConfig = require("webpack-partial").default;
var isomorphicLoader = require.resolve("isomorphic-loader");

var _ = require("lodash");

function getCdnLoader() {
  var loader = _(["electrode-cdn-file-loader", "cdn-file-loader", "file-loader"]).find(function (x) {
    try {
      return require.resolve(x);
    } catch (e) {
      return undefined;
    }
  });

  return loader && require.resolve(loader) || "file-loader";
}

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        rules: [{
          name: "images",
          test: /\.(jpe?g|png|gif|svg)(\?\S*)?$/i,
          use: [
            {
              loader: getCdnLoader(),
              options: {
                limit: 10000
              }
            },
            isomorphicLoader
          ]
        }]
      }
    });
  };
};
