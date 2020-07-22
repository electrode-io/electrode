"use strict";

const archetype = require("@xarc/app-dev/config/archetype")();
const AppMode = archetype.AppMode;
const Path = require("path");
const identity = require("lodash/identity");
const assign = require("lodash/assign");
const babelLoader = require.resolve("babel-loader");

module.exports = function(options) {
  const clientVendor = Path.join(AppMode.src.client, "vendor/");
  const babelExclude = x => {
    if (x.indexOf("node_modules") >= 0) return true;
    if (x.indexOf(clientVendor) >= 0) return true;
    return false;
  };

  const test = archetype.babel.enableTypeScript ? /\.[tj]sx?$/ : /\.jsx?$/;

  const babelLoaderConfig = {
    _name: "babel",
    test,
    exclude: babelExclude,
    use: [
      {
        loader: babelLoader,
        options: Object.assign(
          { cacheDirectory: Path.resolve(".etmp/babel-loader") },
          options.babel
        )
      }
    ].filter(identity)
  };

  return {
    module: {
      rules: [
        assign(
          {},
          babelLoaderConfig,
          archetype.babel.hasMultiTargets ? archetype.babel.extendLoader : {}
        )
      ]
    }
  };
};
