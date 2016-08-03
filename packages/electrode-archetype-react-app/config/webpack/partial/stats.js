"use strict";

var archetype = require("../../archtype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var StatsWriterPlugin = archetype.devRequire("webpack-stats-plugin").StatsWriterPlugin;

module.exports = function () {
  var statsOptions = {
    filename: "../server/stats.json"
  };
  if (process.env.OPTIMIZE_STATS === "true") {
    statsOptions.fields = null;
    statsOptions.transform = function (data) {
      data.modules.forEach(function (m) {
        delete m.source;
      });
      delete data.children;
      return JSON.stringify(data, null, 2);
    };
  }
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new StatsWriterPlugin(statsOptions)
      ]
    });
  };
};
