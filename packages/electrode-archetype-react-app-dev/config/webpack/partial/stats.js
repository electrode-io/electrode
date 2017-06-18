"use strict";

module.exports = function(opts) {
  const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

  const statsOptions = {
    filename: opts.filename || "../server/stats.json",
    fields: ["assetsByChunkName", "assets"]
  };

  if (opts && opts.fullPaths) {
    // generate stats json with full paths
    statsOptions.fields = null;
  }

  if (process.env.OPTIMIZE_STATS === "true") {
    statsOptions.fields = null;
    statsOptions.transform = data => {
      data.modules.forEach(m => {
        delete m.source;
      });
      delete data.children;
      return JSON.stringify(data, null, 2);
    };
  }
  return {
    plugins: [new StatsWriterPlugin(statsOptions)]
  };
};
