"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const IsomorphicLoaderPlugin = require("isomorphic-loader/lib/webpack-plugin");

module.exports = function(opts) {
  return {
    plugins: [
      new IsomorphicLoaderPlugin({
        assetsFile: opts.assetsFile || "../isomorphic-assets.json",
        webpackDev: {
          url: `http://${archetype.webpack.devHostname}:${archetype.webpack.devPort}`,
          addUrl: false
        }
      })
    ]
  };
};
