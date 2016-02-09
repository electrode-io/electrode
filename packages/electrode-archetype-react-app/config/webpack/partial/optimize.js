const mergeWebpackConfig = require("webpack-partial").default;
const optimize = require("webpack").optimize;

module.exports = () => (config) => mergeWebpackConfig(config, {
  plugins: [
    // XXX DedupePlugin causes webpack build errors in Collections App
    //   * https://jira.walmart.com/browse/GPRDT-196
    //new optimize.DedupePlugin(),
    new optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});

