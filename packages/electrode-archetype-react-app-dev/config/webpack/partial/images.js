"use strict";

var archetype = require("../../archetype");
var mergeWebpackConfig = require("webpack-partial").default;
var isomorphicLoader = require.resolve("isomorphic-loader");
var optionalRequire = require("optional-require")(require);

var _ = require("lodash");

function getCdnLoader() {
  var loader = _(["electrode-cdn-file-loader", "cdn-file-loader", "file-loader"]).find(optionalRequire.resolve);

  return loader && require.resolve(loader) || "file-loader";
}

module.exports = Object.defineProperties(function() {
  return function(config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "images",
          test: /\.(jpe?g|png|gif|svg)(\?\S*)?$/i,
          loader: getCdnLoader() + "?limit=10000!" + isomorphicLoader
        }]
      }
    });
  };
}, {
  sequence: {
    value: 0
  }
});
