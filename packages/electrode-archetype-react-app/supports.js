"use strict";

const Path = require("path");

module.exports = {
  cssModuleHook: function(options) {
    options = options || {};
    options.generateScopedName = options.generateScopedName || "[hash:base64]";
    options.rootDir = options.rootDir || Path.resolve(process.cwd(), "client");

    require("css-modules-require-hook")(options);
  },
  babelRegister: require("babel-register"),
  isomorphicExtendRequire: require("isomorphic-loader/lib/extend-require"),
  require: require("./require"),
  optimizeModulesForProduction: require("./scripts/optimize-modules-for-production")
};

