"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;
var StatsWriterPlugin = archDevRequire("webpack-stats-plugin").StatsWriterPlugin;

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

