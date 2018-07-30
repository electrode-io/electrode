"use strict";

const Path = require("path");
const optionalRequire = require("optional-require")(require);
const userConfig = Object.assign({}, optionalRequire(Path.resolve("archetype/config")));

const devPkg = require("../package.json");
const devDir = Path.join(__dirname, "..");
const devRequire = require(`../require`);
const configDir = `${devDir}/config`;
const xenvConfig = devRequire("xenv-config");
const detectCSSModule = require("./webpack/util/detect-css-module");

const webpackConfigSpec = {
  devHostname: { env: ["WEBPACK_HOST", "WEBPACK_DEV_HOST"], default: "localhost" },
  devPort: { env: "WEBPACK_DEV_PORT", default: 2992 },
  testPort: { env: "WEBPACK_TEST_PORT", default: 3001 },
  reporterSocketPort: { env: "WEBPACK_REPORTER_SOCKET_PORT", default: 5000 },
  https: { env: "WEBPACK_DEV_HTTPS", default: false },
  devMiddleware: { env: "WEBPACK_DEV_MIDDLEWARE", default: false },
  cssModuleSupport: { env: "CSS_MODULE_SUPPORT", type: "boolean", default: detectCSSModule() },
  cssModuleStylusSupport: { env: "CSS_MODULE_STYLUS_SUPPORT", default: false },
  enableBabelPolyfill: { env: "ENABLE_BABEL_POLYFILL", default: false },
  enableNodeSourcePlugin: { env: "ENABLE_NODESOURCE_PLUGIN", default: false },
  woffFontInlineLimit: { env: "WOFF_FONT_INLINE_LIMIT", default: 1000 },
  preserveSymlinks: {
    env: ["WEBPACK_PRESERVE_SYMLINKS", "NODE_PRESERVE_SYMLINKS"],
    default: false
  },
  enableShortenCSSNames: { env: "ENABLE_SHORTEN_CSS_NAMES", default: false }
};

const karmaConfigSpec = {
  browser: { env: "KARMA_BROWSER", default: "chrome" }
};

module.exports = {
  devDir,
  devPkg,
  devRequire,
  webpack: xenvConfig(webpackConfigSpec, userConfig.webpack),
  karma: xenvConfig(karmaConfigSpec, userConfig.karma),
  jest: Object.assign({}, userConfig.jest),
  config: Object.assign(
    {},
    {
      babel: `${configDir}/babel`,
      eslint: `${configDir}/eslint`,
      istanbul: `${configDir}/istanbul`,
      karma: `${configDir}/karma`,
      mocha: `${configDir}/mocha`,
      webpack: `${configDir}/webpack`,
      jest: `${configDir}/jest`
    },
    userConfig.configPaths
  )
};
