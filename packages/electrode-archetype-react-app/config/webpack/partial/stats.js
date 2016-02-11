"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new StatsWriterPlugin({
          filename: "../server/stats.json"
        })
      ]
    });
  };
};

