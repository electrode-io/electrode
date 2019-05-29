const LoadablePlugin = require("@loadable/webpack-plugin");
module.exports = function() {
  return {
    plugins: [new LoadablePlugin({ filename: "../server/loadable-stats.json" })]
  };
};
