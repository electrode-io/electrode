"use strict";

const archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;
const webpack = archDevRequire("webpack");
const DefinePlugin = webpack.DefinePlugin;

module.exports = () => (config) => mergeWebpackConfig(config, {
  plugins: [
    new DefinePlugin({
      // Signal production, so that webpack removes non-production code that
      // is in condtionals like: `if (process.env.NODE_ENV === "production")`
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.ELECTRODE_TENANT":  JSON.stringify(process.env.ELECTRODE_TENANT || "walmart")
    })
  ]
});
