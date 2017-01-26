"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var archetype = require("../../archetype");
var AppMode = archetype.AppMode;
var Path = archetype.Path;

module.exports = function (babel) {
  var babelExcludeRegex = new RegExp(`(node_modules|\b${Path.join(AppMode.src.client, "vendor")}\b)`);
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "babel",
          test: /\.jsx?$/,
          exclude: babelExcludeRegex,
          // NOTE: webpack.config.hot.js inserts "react-hot" into loaders array
          loader: "babel-loader",
          query: babel
        },
          {
            name: "json",
            test: /\.json$/,
            loader: "json"
          }]
      }
    });
  };
};
