"use strict";

const { tag } = require("../util/context");
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

module.exports = {
  plugins: [
    new StatsWriterPlugin({
      filename: `./stats${tag}.json`,
      fields: null,
      transform: data => {
        data.modules.forEach(m => {
          delete m.source;
        });
        delete data.children;
        return JSON.stringify(data, null, 2);
      }
    })
  ]
};
