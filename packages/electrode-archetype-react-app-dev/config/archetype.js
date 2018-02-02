"use strict";

const Path = require("path");
const optionalRequire = require("optional-require")(require);
const archetypeOptions = optionalRequire(Path.resolve("archetype", "config"), { default: {} });

const devPkg = require("../package.json");
const devDir = Path.join(__dirname, "..");
const devRequire = require(`../require`);
const configDir = `${devDir}/config`;
const xenvConfig = devRequire("xenv-config");

const webpackConfigSpec = {
  devHostname: { env: ["WEBPACK_HOST", "WEBPACK_DEV_HOST"], default: "localhost" },
  devPort: { env: "WEBPACK_DEV_PORT", default: 2992 },
  testPort: { env: "WEBPACK_TEST_PORT", default: 3001 },
  https: { env: "WEBPACK_DEV_HTTPS", default: false },
  cssModuleSupport: { env: "CSS_MODULE_SUPPORT", default: undefined },
  cssModuleStylusSupport: { env: "CSS_MODULE_STYLUS_SUPPORT", default: false },
  enableBabelPolyfill: { env: "ENABLE_BABEL_POLYFILL", default: false },
  enableNodeSourcePlugin: { env: "ENABLE_NODESOURCE_PLUGIN", default: false },
  woffFontInlineLimit: { env: "WOFF_FONT_INLINE_LIMIT", default: 1000 },
  preserveSymlinks: { env: ["WEBPACK_PRESERVE_SYMLINKS", "NODE_PRESERVE_SYMLINKS"], default: false }
};

const karmaConfigSpec = {
  browser: { env: "KARMA_BROWSER", default: "chrome" }
};

module.exports = {
  devDir,
  devPkg,
  devRequire,
  webpack: xenvConfig(webpackConfigSpec, archetypeOptions.webpack),
  karma: xenvConfig(karmaConfigSpec, archetypeOptions.karma),
  config: Object.assign(
    {},
    {
      babel: `${configDir}/babel`,
      eslint: `${configDir}/eslint`,
      istanbul: `${configDir}/istanbul`,
      karma: `${configDir}/karma`,
      mocha: `${configDir}/mocha`,
      webpack: `${configDir}/webpack`
    },
    archetypeOptions.configPaths
  )
};
