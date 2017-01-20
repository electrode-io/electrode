"use strict";

var archetype = require("../../archetype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var StatsWriterPlugin = archetype.devRequire("webpack-stats-plugin").StatsWriterPlugin;

module.exports = function (opts) {
  var statsOptions = {
    filename: "../server/stats.json",
    fields: ['assetsByChunkName', 'assets']
  };

  if (opts && opts.fullPaths) {
    // generate stats json with full paths
    statsOptions.fields = null;
  }

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
