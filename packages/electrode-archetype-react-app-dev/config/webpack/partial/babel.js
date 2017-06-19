"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const AppMode = archetype.AppMode;
const Path = require("path");
const _ = require("lodash");
const logger = require("electrode-archetype-react-app/lib/logger");

module.exports = function(options) {
  // regex \b for word boundaries
  const babelExcludeRegex = new RegExp(
    `(node_modules|\\b${Path.join(AppMode.src.client, "vendor")}\\b)`
  );

  const babelLoader = {
    _name: "babel",
    test: /\.jsx?$/,
    exclude: babelExcludeRegex,
    use: [
      options.HotModuleReload && "react-hot-loader",
      {
        loader: "babel-loader",
        options: options.babel
      }
    ].filter(_.identity)
  };

  if (options.HotModuleReload) {
    logger.info("Enabling Hot Module Reload support in webpack babel loader");
    babelLoader.include = Path.resolve(AppMode.src.client);
  }

  return {
    module: {
      rules: [_.assign({}, babelLoader, archetype.webpack.extendBabelLoader)]
    }
  };
};
