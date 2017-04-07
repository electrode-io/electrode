"use strict";

const archetype = require("kununu-electrode-archetype-react-app/config/archetype");
const SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;

module.exports = function () {
  const host = `http://${archetype.webpack.devHostname}:${archetype.webpack.devPort}`;
  return {
    plugins: [
      new SourceMapDevToolPlugin({
        filename: "../map/[file].map",
        append: `\n//# sourceMappingURL=${host}/dist/map/[url]`
      })
    ]
  };
};
