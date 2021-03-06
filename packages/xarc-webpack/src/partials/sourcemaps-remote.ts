/* eslint-disable @typescript-eslint/no-var-requires */

const SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;

module.exports = function() {
  return {
    plugins: [
      new SourceMapDevToolPlugin({
        filename: "../map/[file].map",
        append: `\n//# sourceMappingURL=../[url]`
      })
    ]
  };
};
