const LoadablePlugin = require("@loadable/webpack-plugin");
const archetype = require("electrode-archetype-react-app/config/archetype");
module.exports = function() {
  return {
    plugins: archetype.babel.enableDynamicImport
      ? [new LoadablePlugin({ filename: "../server/loadable-stats.json" })]
      : []
  };
};
