"use strict";

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = function() {
  // Allow env var to disable minifcation for inspectpack usage.
  if (process.env.INSPECTPACK_DEBUG === "true") {
    return {};
  }

  const uglifyOpts = {
    sourceMap: true,
    parallel: true,
    uglifyOptions: {
      compress: {
        warnings: false,
        unused: true,
        dead_code: true
      }
    }
  };

  // preserve module ID comment in bundle output for optimizeStats
  if (process.env.OPTIMIZE_STATS === "true") {
    uglifyOpts.comments = /^\**!|^ [0-9]+ $|@preserve|@license/;
  }

  return {
    optimization: {
      minimizer: [new UglifyJsPlugin(uglifyOpts)]
    }
  };
};
