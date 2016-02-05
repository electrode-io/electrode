const _ = require("lodash");
const testCfg = require("./webpack.config.test");

const ispartaLoader = require.resolve("isparta-loader");

module.exports = _.merge({}, testCfg, {
  module: {
    preLoaders: [
      // Manually instrument client code for code coverage.
      // https://github.com/deepsweet/isparta-loader handles ES6 + normal JS.
      {
        test: /src\/.*\.jsx?$/,
        exclude: /(test|node_modules)\//,
        loader: ispartaLoader
      }
    ]
  }
});
