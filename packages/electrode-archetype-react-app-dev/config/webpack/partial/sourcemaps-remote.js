"use strict";

var archetype = require("../../archetype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var SourceMapDevToolPlugin = archetype.devRequire("webpack").SourceMapDevToolPlugin;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new SourceMapDevToolPlugin(
          "../map/[file].map",
          `\n//# sourceMappingURL=http://${archetype.webpack.devHostname}:${archetype.webpack.devPort}/dist/map/[url]`
        )
      ]
    });
  };
};
