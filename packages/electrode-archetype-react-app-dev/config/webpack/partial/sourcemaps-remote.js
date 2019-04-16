"use strict";

const SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;

module.exports = function() {
  return {
    plugins: [
      new SourceMapDevToolPlugin({
        filename: "../map/[file].map",
        append: `\n//# sourceMappingURL=/map/[url]`
      })
    ]
  };
};
