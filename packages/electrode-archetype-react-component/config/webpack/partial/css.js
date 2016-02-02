const partial = require("webpack-partial").default;

const styleLoader = require.resolve("style-loader");
const cssLoader = require.resolve("css-loader");

module.exports = () => (config) => partial(config, {
  module: {
    loaders: [{
      name: "css",
      test: /\.css$/,
      loader: styleLoader + "!" + cssLoader
    }]
  }
});
