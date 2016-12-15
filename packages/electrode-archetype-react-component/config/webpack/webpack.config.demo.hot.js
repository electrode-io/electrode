"use strict";

var archDevRequire = require("electrode-archetype-react-component-dev/require");
var webpack = archDevRequire("webpack");
var _ = archDevRequire("lodash");

var base = require("./webpack.config.demo.dev");

// Update our own module version.
var mod = _.cloneDeep(base.module);
// First loader needs react hot.
mod.loaders[0].loaders = ["react-hot"].concat(mod.loaders[0].loaders);
base.devServer.hot = true;

module.exports = _.merge({}, _.omit(base, "entry", "module"), {
  entry: {
    app: [
      "webpack-dev-server/client?http://0.0.0.0:" +
        (process.env.WEBPACK_DEVSERVER_PORT || "4000"), // WebpackDevServer host and port
      "webpack/hot/only-dev-server",
      "./demo/demo.jsx"
    ]
  },

  module: mod,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ].concat(base.plugins)
});
