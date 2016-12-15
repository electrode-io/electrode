"use strict";

const archDevRequire = require("electrode-archetype-react-component-dev/require");
const mergeWebpackConfig = archDevRequire("webpack-partial").default;
const SourceMapDevToolPlugin = archDevRequire("webpack").SourceMapDevToolPlugin;

module.exports = () => (config) => {
  // TODO: Generate real URLs using SOURCE_MAP_URL.
  const url = () => "[url]";

  return mergeWebpackConfig(config, {
    plugins: [
      new SourceMapDevToolPlugin({
        test: /\.(css|js)($|\?)/,
        filename: "[file].map",
        append: `\n//# sourceMappingURL=${url()}`,
        module: true,
        columns: true
      })
    ]
  });
};
