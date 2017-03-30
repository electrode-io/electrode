"use strict";

var archDevRequire = require("electrode-archetype-react-component-dev/require");
var webpack = archDevRequire("webpack");
var _ = archDevRequire("lodash");

var base = require("./webpack.config.demo.dev");

// Update our own module version.
var mod = _.cloneDeep(base.module);
// First loader needs react hot.
mod.rules[0].loader = ["react-hot-loader"].concat(mod.rules[0].loader);
base.devServer.hot = true;

module.exports = _.merge({}, _.omit(base, "entry", "module"), {
  entry: {
    app: [
      "webpack-dev-server/client?http://0.0.0.0:" +
        (process.env.WEBPACK_DEVSERVER_PORT || "4000"), // WebpackDevServer host and port
      "webpack/hot/only-dev-server",
      "./demo/demo.jsx"
    ].concat(base.entry.app)
  },

  module: mod,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ].concat(base.plugins)
});
