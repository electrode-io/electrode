"use strict";

const Uglify = require("uglifyjs-webpack-plugin");

module.exports = function() {
  // Allow env var to disable minifcation for inspectpack usage.
  if (process.env.INSPECTPACK_DEBUG === "true") {
    return {};
  }

  const uglifyOpts = {
    uglifyOptions: {
      sourceMap: true,
      compress: {
        warnings: false
      }
    }
  };

  // preserve module ID comment in bundle output for optimizeStats
  if (process.env.OPTIMIZE_STATS === "true") {
    uglifyOpts.extractComments = /^\**!|^ [0-9]+ $|@preserve|@license/;
  }

  return { plugins: [new Uglify(uglifyOpts)] };
};
