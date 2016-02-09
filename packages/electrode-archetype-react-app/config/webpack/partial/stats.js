const mergeWebpackConfig = require("webpack-partial").default;
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

module.exports = () => (config) => mergeWebpackConfig(config, {
  plugins: [
    new StatsWriterPlugin({
      filename: "../server/stats.json"
    }),
  ]
});

