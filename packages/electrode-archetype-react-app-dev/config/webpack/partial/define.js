"use strict";

const DefinePlugin = require("webpack").DefinePlugin;

module.exports = function() {
  return {
    plugins: [
      new DefinePlugin({
        // Signal production, so that webpack removes
        // non-production code that is in conditionals
        // like: `if (process.env.NODE_ENV === "production")`
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
      })
    ]
  };
};
