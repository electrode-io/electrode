/* eslint-disable global-require, no-magic-numbers, max-statements */

import * as Crypto from "crypto";
import { loadXarcOptions } from "../util/load-xarc-options";
import * as _ from "lodash";
import { ModuleFederationPlugin } from "../container/ModuleFederationPlugin";
const splitMap = {};

function hashChunks(mod, chunks, key) {
  const chunkNames = chunks.map(c => c.name).sort();
  const id = `${key}~${chunkNames.join("~")}`;
  let digest = splitMap[id];
  if (!digest) {
    const hash = Crypto.createHash("md5");
    hash.update(id);
    digest = hash.digest("hex");
    splitMap[id] = digest;
  }
  digest = digest.substr(-8);
  // subapp-web/lib/util.js will try to match <entryName>.~ to detect subapp bundles
  return `${key}.~${digest}`;
}

function makeConfig(options) {
  const { AppMode, webpack } = loadXarcOptions();

  const config: any = {};

  if (!AppMode.hasSubApps) {
    return config;
  }

  let runtimeChunk = "single";

  if (webpack.v1RemoteSubApps) {
    let exposeRemote = 0;
    const cdnMapping = _.get(webpack, "cdn.enable", false) && _.get(webpack, "cdn.mapping", false);
    const modFedPlugins = [].concat(webpack.v1RemoteSubApps).map(remote => {
      const missing = [];
      const subAppsToExpose = []
        .concat(remote.subAppsToExpose)
        .filter(x => x)
        .reduce((exp, x) => {
          if (!AppMode.subApps[x]) {
            missing.push(x);
          } else {
            const subapp = AppMode.subApps[x];
            exp[`./${subapp.name}`] = `./${subapp.subAppDir}/${subapp.entry}`;
          }
          return exp;
        }, {});
      if (missing.length > 0) {
        throw new Error(`v1RemoteSubApps exposed subapp not found: ${missing.join(", ")}`);
      }
      const exposes = { ...remote.exposes, ...subAppsToExpose };
      const eager = _.isEmpty(exposes);
      if (!eager) {
        exposeRemote++;
      }
      const shared = Object.keys(remote.shared).reduce((sh, x) => {
        sh[x] = { eager, ...remote.shared[x] };
        return sh;
      }, {});

      const idName = remote.name.replace(/[^_\$0-9A-Za-z]/g, "_");
      const name = !eager ? `__remote_${idName}` : idName;

      return new ModuleFederationPlugin({
        name,
        filename: remote.filename || `_remote_~.${idName}.js`,
        entry:
          cdnMapping && !process.env.WEBPACK_DEV && require.resolve("../client/webpack5-jsonp-cdn"),
        exposes,
        shared,
        remotes: remote.remotes
      } as any);
    });
    config.plugins = [].concat(config.plugins, modFedPlugins).filter(x => x);

    // if app is exposing modules for remote loading, then we must set following
    if (exposeRemote > 0) {
      if (process.env.WEBPACK_DEV || !cdnMapping) {
        // in dev mode there's no CDN mapping, so must set public path to auto for
        // remote container to load its bundles
        options.currentConfig.output.publicPath = "auto";
      }
      runtimeChunk = undefined;
    }
  }

  if (webpack.minimizeSubappChunks) {
    config.optimization = {
      runtimeChunk,
      splitChunks: {
        cacheGroups: {
          common: {
            chunks: "all",
            minChunks: 10,
            enforce: true,
            name: "common"
          }
        }
      }
    };
  } else {
    // use webpack splitChunks optimization to automatically put modules
    // shared by subapps into common bundles.
    // The common bundles will be determined by the splitChunks parameters.
    // The filename has the pattern of hex-sum.bundle1~bundle2~bundle#.js
    // https://webpack.js.org/plugins/split-chunks-plugin/
    config.optimization = {
      runtimeChunk,
      splitChunks: {
        chunks: "all",
        minSize: 30 * 1024,
        maxSize: 250 * 1024,
        minChunks: 2,
        maxAsyncRequests: 500,
        maxInitialRequests: 500,
        automaticNameDelimiter: "~",
        // automaticNameMaxLength: 250,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksname
            name: hashChunks,
            priority: -10,
            reuseExistingChunk: true
          },
          shared: {
            name: hashChunks,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    };
  }

  return config;
}

module.exports = makeConfig;
