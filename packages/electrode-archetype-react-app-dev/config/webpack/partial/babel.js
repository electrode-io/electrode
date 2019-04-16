"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const AppMode = archetype.AppMode;
const Path = require("path");
const Fs = require("fs");
const _ = require("lodash");
const logger = require("electrode-archetype-react-app/lib/logger");

module.exports = function(options) {
  const { options: babelLoaderOptions = {}, ...rest } = archetype.babel.extendLoader;

  const getBabelrcClient = () => {
    const babelrcClient = JSON.parse(
      Fs.readFileSync(require.resolve("../../babel/babelrc-client-multitargets"))
    );
    const { target, envTargets } = archetype.babel;
    const { presets, plugins, ...restOptions } = babelLoaderOptions;
    const targets = envTargets[target];
    babelrcClient.presets.unshift([
      "env",
      { loose: true, targets, useBuiltIns: "entry", corejs: "2", modules: false }
    ]);
    babelrcClient.presets = Object.assign(babelrcClient.presets, presets);
    babelrcClient.plugins = Object.assign(babelrcClient.plugins, plugins);
    return Object.assign(babelrcClient, { babelrc: false }, restOptions);
  };

  if (options.HotModuleReload) {
    require("react-hot-loader/patch");
  }

  const clientVendor = Path.join(AppMode.src.client, "vendor/");
  const babelExclude = x => {
    if (x.indexOf("node_modules") >= 0) return true;
    if (x.indexOf(clientVendor) >= 0) return true;
    return false;
  };

  const babelLoader = {
    _name: "babel",
    test: /\.jsx?$/,
    exclude: babelExclude,
    use: [
      {
        loader: "babel-loader",
        options: Object.assign(
          { cacheDirectory: Path.resolve(".etmp/babel-loader") },
          options.babel,
          archetype.babel.hasMultiTargets ? getBabelrcClient() : {}
        )
      }
    ].filter(_.identity)
  };

  if (options.HotModuleReload) {
    logger.info("Enabling Hot Module Reload support in webpack babel loader");
    babelLoader.include = Path.resolve(AppMode.src.client);
  }

  return {
    module: {
      rules: [_.assign({}, babelLoader, archetype.babel.hasMultiTargets ? rest : {})]
    }
  };
};
