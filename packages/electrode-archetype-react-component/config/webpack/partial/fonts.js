"use strict";
const archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");

const mergeWebpackConfig = archDevRequire("webpack-partial").default;

const urlLoader = archDevRequire.resolve("url-loader");
const fileLoader = archDevRequire.resolve("file-loader");

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "woff",
      test: /\.woff(2)?$/i,
      loader: urlLoader + "?limit=10000&mimetype=application/font-woff"
    }, {
      name: "fonts",
      test: /\.(ttf|eot)$/i,
      loader: fileLoader
    }]
  }
});
