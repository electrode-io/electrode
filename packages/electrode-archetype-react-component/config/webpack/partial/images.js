const partial = require("webpack-partial").default;

var urlLoader = require.resolve("url-loader");

module.exports = () => (config) => partial(config, {
  module: {
    loaders: [{
      name: "images",
      test: /\.(png|jpg|svg|gif)$/,
      loader: urlLoader
    }]
  }
});
