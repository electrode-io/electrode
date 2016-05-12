"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;
var SourceMapDevToolPlugin = archDevRequire("webpack").SourceMapDevToolPlugin;

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        // TODO: Generate real URLs using SOURCE_MAP_URL.
        // TODO: And, switch to internal sourcemaps server.
        // https://gecgithub01.walmart.com/electrode/electrode-archetype-react-app/issues/39
        new SourceMapDevToolPlugin(
          "../map/[file].map",
          "\n//# sourceMappingURL=http://dev.walmart.com:2992/dist/map/[url]"
        )
      ]
    });
  };
};
