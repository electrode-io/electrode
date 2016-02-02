const partial = require('webpack-partial').default;
const optimize = require('webpack').optimize;

module.exports = () => (config) => partial(config, {
  plugins: [
    new optimize.DedupePlugin(),
    new optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    })
  ]
});
