/*globals __dirname:false */
"use strict";

var path = require("path");

var archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");
var webpack = archDevRequire("webpack");
var _ = archDevRequire("lodash");


var base = require("./webpack.config");

try {
  // If the module is multi-tenant there will be a tenants folder here
  fs.statSync(process.cwd() + '/demo/tenants/');
  // Use the correct tenant styles
  var tenant = process.env.ELECTRODE_TENANT || 'walmart';
  var stylePath = path.join(process.cwd() + "/demo/tenants/"+tenant+"/demo.styl");
} catch (e) {
  // Otherwise just use the default one
  var stylePath = path.join(process.cwd() + "/demo/demo.styl");
}

module.exports = {
  devServer: {
    port: process.env.WEBPACK_DEVSERVER_PORT || "4000",
    contentBase: path.join(__dirname, "../../demo-server"),
    noInfo: false,
    historyApiFallback: true
  },
  output: {
    path: process.cwd(),
    filename: "bundle.dev.js",
    publicPath: "/js/"
  },
  cache: true,
  devtool: "source-map",
  entry: {
    app: [path.join(__dirname, "../../demo-server/app.js")]
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: _.merge({}, base.resolve, {
    alias: {
      // Allow root import of `src/FOO` from ROOT/src.
      src: path.join(process.cwd(), "src"),
      "local-component-demo": path.join(process.cwd() + "/demo/demo.jsx"),
      "local-demo-styl": path.join(process.cwd() + "/demo/demo.styl")
    }
  }),
  resolveLoader: base.resolveLoader,
  module: base.module,
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
