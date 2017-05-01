"use strict";

global.navigator = { userAgent: "all" };

process.on("SIGINT", () => {
  process.exit(0);
});

const config = require("electrode-confippet").config;
const staticPathsDecor = require("electrode-static-paths");
const support = require("electrode-archetype-react-app/support");

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
support.cssModuleHook({
  generateScopedName: "[name]__[local]___[hash:base64:5]"
});

support.load({
  isomorphicExtendRequire: true
}).then(() => {
  require("electrode-server")(config, [staticPathsDecor()]);
});
