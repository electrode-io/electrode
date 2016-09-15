"use strict";

process.on("SIGINT", () => {
  process.exit(0);
});

const config = require("electrode-confippet").config;
const staticPathsDecor = require("electrode-static-paths");

/**
 * css-modules-require-hook: handle css-modules on node.js server.
 * similar to Babel's babel/register it compiles CSS modules in runtime.
 */
const hook = require("css-modules-require-hook");

require("babel-register")({
  ignore: /node_modules\/(?!react\/)/
});

/**
 * generateScopedName - Short alias for the postcss-modules-scope plugin's option.
 * Helps you to specify the custom way to build generic names for the class selectors.
 * You may also use a string pattern similar to the webpack's css-loader.
 *
 * https://github.com/css-modules/css-modules-require-hook#generatescopedname-function
 * https://github.com/webpack/css-loader#local-scope
 * https://github.com/css-modules/postcss-modules-scope
 */
hook({
  generateScopedName: "[name]__[local]___[hash:base64:5]"
});

require("electrode-server")(config, [staticPathsDecor()]);
