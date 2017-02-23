"use strict";

const mergeWebpackConfig = require("webpack-partial").default;
const isomorphicLoader = require.resolve("isomorphic-loader");
const optionalRequire = require("optional-require")(require);
const _ = require("lodash");

function getCdnLoader() {
  const loader = _(["electrode-cdn-file-loader", "cdn-file-loader", "file-loader"]).find(optionalRequire.resolve);

  return loader && require.resolve(loader) || "file-loader";
}

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      module: {
        rules: [{
          test: /\.(jpe?g|png|gif|svg)(\?\S*)?$/i,
          use: [
            {
              loader: getCdnLoader(),
              options: {
                limit: 10000
              }
            },
            isomorphicLoader
          ]
        }]
      }
    });
  };
};
