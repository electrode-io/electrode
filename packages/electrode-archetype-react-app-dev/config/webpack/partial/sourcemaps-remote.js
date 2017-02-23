"use strict";

const archetype = require("../../archetype");
const mergeWebpackConfig = require("webpack-partial").default;
const SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;

module.exports = function () {
  const host = `http://${archetype.webpack.devHostname}:${archetype.webpack.devPort}`;
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new SourceMapDevToolPlugin({
          filename: "../map/[file].map",
          append: `\n//# sourceMappingURL=${host}/dist/map/[url]`
        })
      ]
    });
  };
};
