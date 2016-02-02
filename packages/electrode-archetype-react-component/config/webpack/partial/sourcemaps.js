const partial = require("webpack-partial").default;
const webpack = require("webpack");
const SourceMapDevToolPlugin = webpack.SourceMapDevToolPlugin;

module.exports = () => (config) => {
  // TODO: Generate real URLs using SOURCE_MAP_URL.
  const url = () => "[url]";

  return partial(config, {
    plugins: [
      new SourceMapDevToolPlugin({
        test: /\.(css|js)($|\?)/,
        filename: "[file].map",
        append: `\n//# sourceMappingURL=${url()}`,
        module: true,
        columns: true,
      })
    ]
  });
};
