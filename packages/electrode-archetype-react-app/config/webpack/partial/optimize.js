"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;
var optimize = archDevRequire("webpack").optimize;
var _ = archDevRequire("lodash");

// var LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        //
        // Disabled because it was silently breaking functionality.
        // TODO: Re-enable when this is resolved.
        // https://gecgithub01.walmart.com/electrode/electrode-archetype-react-app/issues/158
        //
        //new LodashModuleReplacementPlugin(),
        new optimize.DedupePlugin(),
        new optimize.UglifyJsPlugin(_.merge(
          {
            compress: {
              warnings: false
            }
          },
          process.env.OPTIMIZE_STATS === "true" && {
            comments: /^\**!|^ [0-9]+ $|@preserve|@license/
          }))
      ]
    });
  };
};
