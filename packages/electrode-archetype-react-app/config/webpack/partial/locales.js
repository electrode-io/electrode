"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var ContextReplacementPlugin = require("webpack").ContextReplacementPlugin;

// Note that in modern versions of `moment`, there is actually no
// `locale/en.js`, `en` is simply the default and included in `moment` itself.
// (There are territory modifiers like `en-gb` and `en-ca` however.) So don't
// expect to actually see `en.js` in the module list. The locale is listed here
// so (1) the list of locales makes more sense and (2) just in case a different
// version of `moment` is used which does have an `en.js`.
var LOCALES = ["en"]; // TODO: Finalize list of locales.
var LOCALES_REGEX = new RegExp("^\./(" + LOCALES.join("|") + ")$");

module.exports = function () {
  return function (config) {
    return mergeWebpackConfig(config, {
      plugins: [
        new ContextReplacementPlugin(/moment[\\\/]locale$/, LOCALES_REGEX)
      ]
    });
  };
};
