"use strict";

process.on("SIGINT", () => {
  process.exit(0);
});

const config = require("electrode-confippet").config;
const staticPathsDecor = require("electrode-static-paths");
const supports = require("electrode-archetype-react-app/supports");

/**
 * Use babel register to transpile any JSX code on the fly to run
 * in server mode, and also transpile react code to apply process.env.NODE_ENV
 * removal to improve performance in production mode.
 */
supports.babelRegister({
  ignore: /node_modules\/(?!react\/)/
});

/**
 * css-modules-require-hook: handle css-modules on node.js server.
 * similar to Babel's babel/register it compiles CSS modules in runtime.
 *
 * generateScopedName - Short alias for the postcss-modules-scope plugin's option.
 * Helps you to specify the custom way to build generic names for the class selectors.
 * You may also use a string pattern similar to the webpack's css-loader.
 *
 * https://github.com/css-modules/css-modules-require-hook#generatescopedname-function
 * https://github.com/webpack/css-loader#local-scope
 * https://github.com/css-modules/postcss-modules-scope
 */
supports.cssModuleHook({
  generateScopedName: "[name]__[local]___[hash:base64:5]"
});

require("electrode-server")(config, [staticPathsDecor()]);
