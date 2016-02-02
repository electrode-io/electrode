const partial = require("webpack-partial").default;

module.exports = () => (config) => partial(config, {
  module: {
    loaders: [{
      name: "json",
      test: /\.json$/,
      loader: require.resolve("json-loader")
    }]
  }
});
