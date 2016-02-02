const mergeWebpackConfig = require("webpack-partial").default;

const styleLoader = require.resolve("style-loader");
const cssLoader = require.resolve("css-loader");
const stylusLoader = require.resolve("stylus-loader");

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "stylus",
      test: /\.styl$/,
      loader: styleLoader + "!" + cssLoader + "?modules!" + stylusLoader
    }]
  }
});
