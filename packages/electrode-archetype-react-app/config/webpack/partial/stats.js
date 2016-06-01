"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;
var StatsWriterPlugin = archDevRequire("webpack-stats-plugin").StatsWriterPlugin;

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
