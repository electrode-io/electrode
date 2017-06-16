"use strict";

const webpack = require("webpack");
const DefinePlugin = webpack.DefinePlugin;

module.exports = function() {
  return {
    plugins: [
      new DefinePlugin({
        // Signal production, so that webpack removes non-production code that
        // is in condtionals like: `if (process.env.NODE_ENV === "production")`
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
        "process.env.ELECTRODE_TENANT": JSON.stringify(process.env.ELECTRODE_TENANT || "walmart"),
        "process.env.ELECTRODE_LOCALE": JSON.stringify(process.env.ELECTRODE_LOCALE || "en")
      })
    ]
  };
};
