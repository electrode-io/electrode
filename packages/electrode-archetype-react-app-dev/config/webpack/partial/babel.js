"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const AppMode = archetype.AppMode;
const Path = require("path");
const _ = require("lodash");

module.exports = function(options) {
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
          options.babel
        )
      }
    ].filter(_.identity)
  };

  return {
    module: {
      rules: [_.assign({}, babelLoader, archetype.webpack.extendBabelLoader)]
    }
  };
};
