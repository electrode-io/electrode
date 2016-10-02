"use strict";

module.exports = {
  cssModuleHook: require("css-modules-require-hook"),
  babelRegister: require("babel-register"),
  isomorphicExtendRequire: require("isomorphic-loader/lib/extend-require"),
  require: require("./require")
};

