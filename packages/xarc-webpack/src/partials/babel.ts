/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";
const identity = require("lodash/identity");
const assign = require("lodash/assign");
const babelLoader = require.resolve("babel-loader");

import { loadXarcOptions } from "../util/load-xarc-options";

module.exports = function(options) {
  const xarcOptions = loadXarcOptions();
  const AppMode = xarcOptions.AppMode;

  const clientVendor = Path.join(AppMode.src.client, "vendor/");
  const { includeRegExp, excludeRegExp } = xarcOptions.babel;

  const babelExclude = (x: string) => {
    if (includeRegExp && includeRegExp.find((r: RegExp) => x.match(r))) {
      return false;
    }

    if (excludeRegExp && excludeRegExp.find((r: RegExp) => x.match(r))) {
      return true;
    }

    if (x.indexOf("node_modules") >= 0) {
      if (x.indexOf("~es2x~") >= 0 || x.indexOf("~es6~") >= 0) {
        return false;
      }
      return true;
    }

    if (x.indexOf(clientVendor) >= 0) {
      return true;
    }

    return false;
  };

  const test = xarcOptions.babel.enableTypeScript ? /\.[tj]sx?$/ : /\.jsx?$/;

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
          xarcOptions.babel.hasMultiTargets ? xarcOptions.babel.extendLoader : {}
        )
      ]
    }
  };
};
