const mergeWebpackConfig = require("webpack-partial").default;

module.exports = (babel) => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "babel",
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: require.resolve("babel-loader"),
      query: babel
    }]
  }
});
