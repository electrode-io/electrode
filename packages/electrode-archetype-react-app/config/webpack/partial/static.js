const mergeWebpackConfig = require("webpack-partial").default;

const urlLoader = require.resolve("url-loader");

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [
      {
        name: "static",
        test: /\.(ttf|eot|svg|png)$/,
        loader: require.resolve("file-loader")
      },
      {
        name: "woff",
        test: /\.woff(2)?$/,
        loader: `${urlLoader}?limit=10000&mimetype=application/font-woff`
      }
    ]
  }
});

