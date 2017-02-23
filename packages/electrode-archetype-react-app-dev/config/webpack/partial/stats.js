"use strict";

const mergeWebpackConfig = require("webpack-partial").default;
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

module.exports = function (opts) {
  const statsOptions = {
    filename: "../server/stats.json",
    fields: ["assetsByChunkName", "assets"]
  };

  if (opts && opts.fullPaths) {
    // generate stats json with full paths
    statsOptions.fields = null;
  }

  if (process.env.OPTIMIZE_STATS === "true") {
    statsOptions.fields = null;
    statsOptions.transform = (data) => {
      data.modules.forEach((m) => {
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
