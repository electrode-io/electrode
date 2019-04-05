"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const Uglify = require("uglifyjs-webpack-plugin");
const optimize = require("webpack").optimize;

const hasMultiTargets =
  Object.keys(archetype.babel.envTargets)
    .sort()
    .join(",") !== "default,node";

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

  const uglifyPlugin = hasMultiTargets
    ? new Uglify({ uglifyOptions: uglifyOpts, extractComments: uglifyOpts.comments })
    : new optimize.UglifyJsPlugin(uglifyOpts);

  return { plugins: [uglifyPlugin] };
};
