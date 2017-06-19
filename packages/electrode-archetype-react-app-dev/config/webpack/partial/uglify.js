"use strict";

const optimize = require("webpack").optimize;

module.exports = function() {
  // Allow env var to disable minifcation for inspectpack usage.
  if (process.env.INSPECTPACK_DEBUG === "true") {
    return {};
  }

  const uglifyOpts = {
    sourceMap: true,
    compress: {
      warnings: false
    }
  };

  // preserve module ID comment in bundle output for optimizeStats
  if (process.env.OPTIMIZE_STATS === "true") {
    uglifyOpts.comments = /^\**!|^ [0-9]+ $|@preserve|@license/;
  }

  return { plugins: [new optimize.UglifyJsPlugin(uglifyOpts)] };
};
