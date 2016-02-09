const mergeWebpackConfig = require("webpack-partial").default;

module.exports = (babel) => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "babel",
      test: /\.jsx?$/,
      exclude: /node_modules/,
      // NOTE: webpack.config.hot.js inserts "react-hot" into loaders array
      loaders: [require.resolve("babel-loader")],
      query: babel
    }]
  }
});

