/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";
import { getBabelExclude } from "../util";
const identity = require("lodash/identity");
const assign = require("lodash/assign");
const babelLoader = require.resolve("babel-loader");
import { generateBabelLoaderCacheId } from "../util/generate-babel-loader-cache-id";

import { loadXarcOptions } from "../util/load-xarc-options";

module.exports = function(options) {
  const xarcOptions = loadXarcOptions();

  const test = xarcOptions.babel.enableTypeScript ? /\.[tj]sx?$/ : /\.jsx?$/;

  const cacheIdentifier = generateBabelLoaderCacheId(xarcOptions.cwd);
  const babelLoaderConfig = {
    _name: "babel",
    test,
    exclude: getBabelExclude(xarcOptions),
    use: [
      {
        loader: babelLoader,
        options: Object.assign(
          {
            cacheIdentifier,
            cacheDirectory: Path.resolve(xarcOptions.cwd, ".etmp/babel-loader")
          },
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
