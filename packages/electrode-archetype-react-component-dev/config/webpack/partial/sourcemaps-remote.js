"use strict";

const SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;

module.exports = function() {
  const url = () => "[url]";

  return {
    plugins: [
      new SourceMapDevToolPlugin({
        test: /\.(css|js)($|\?)/,
        filename: "[file].map",
        append: `\n//# sourceMappingURL=${url()}`,
        module: true,
        columns: true
      })
    ]
  }
};
