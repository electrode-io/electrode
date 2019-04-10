"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const AppMode = archetype.AppMode;
const Path = require("path");
const Fs = require("fs");
const _ = require("lodash");
const logger = require("electrode-archetype-react-app/lib/logger");

const getBabelrcClient = () => {
  const babelrcClient = JSON.parse(
    Fs.readFileSync(require.resolve("../../babel/babelrc-client-multitargets"))
  );
  const { target, envTargets } = archetype.babel;
  const { presets, plugins, ...rest } = archetype.babel.extendLoaderOptions;
  const targets = envTargets[target];
  babelrcClient.presets.unshift(["env", { loose: true, targets, useBuiltIns: "entry", corejs: "2" }]);
  babelrcClient.presets = Object.assign(babelrcClient.presets, presets);
  babelrcClient.plugins = Object.assign(babelrcClient.plugins, plugins);
  return Object.assign(babelrcClient, { babelrc: false }, rest);
};

module.exports = function(options) {
  if (options.HotModuleReload) {
    require("react-hot-loader/patch");
  }

  const babelLoader = {
    _name: "babel",
    test: /\.jsx?$/,
    exclude: archetype.babel.exclude,
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
      rules: [_.assign({}, babelLoader)]
    }
  };
};
