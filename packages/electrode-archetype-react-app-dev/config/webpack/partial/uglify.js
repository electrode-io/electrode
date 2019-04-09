"use strict";

const Uglify = require("uglifyjs-webpack-plugin");
const optimize = require("webpack").optimize;
const archetype = require("electrode-archetype-react-app/config/archetype");

module.exports = function() {
  // Allow env var to disable minifcation for inspectpack usage.
  if (process.env.INSPECTPACK_DEBUG === "true") {
    return {};
  }

  const uglifyOpts = archetype.babel.hasMultiTargets
    ? {
        sourceMap: true,
        uglifyOptions: {
          compress: {
            warnings: false
          }
        }
      }
    : {
        sourceMap: true,
        compress: {
          warnings: false
        }
      };

  // preserve module ID comment in bundle output for optimizeStats
  if (process.env.OPTIMIZE_STATS === "true") {
    const comments = archetype.babel.hasMultiTargets ? "extractComments" : "comments";
    uglifyOpts[comments] = /^\**!|^ [0-9]+ $|@preserve|@license/;
  }

  const uglifyPlugin = archetype.babel.hasMultiTargets
    ? new Uglify(uglifyOpts)
    : new optimize.UglifyJsPlugin(uglifyOpts);

  return { plugins: [uglifyPlugin] };
};
