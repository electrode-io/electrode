"use strict";

var path = require("path");

module.exports = {
  cssModuleHook: function(options) {
    options = options || {};
    options.generateScopedName = options.generateScopedName || "[hash:base64]";
    options.rootDir = options.rootDir || path.resolve(process.cwd(), "client");

    require("css-modules-require-hook")(options);
  },
  babelRegister: require("babel-register"),
  isomorphicExtendRequire: require("isomorphic-loader/lib/extend-require"),
  require: require("./require")
};

