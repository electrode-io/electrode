"use strict";

const Path = require("path");
const optionalRequire = require("optional-require")(require);
const userConfig = Object.assign({}, optionalRequire(Path.resolve("archetype/config")));
const { merge } = require("lodash");

const devPkg = require("../package.json");
const devDir = Path.join(__dirname, "..");
const devRequire = require(`../require`);
const configDir = `${devDir}/config`;
const xenvConfig = devRequire("xenv-config");
const _ = require("lodash");

const defaultOptimizeCssOptions = {
  cssProcessorOptions: {
    zindex: false
  }
};
const options = (userConfig && userConfig.options) || {};

const webpackConfigSpec = {
  devHostname: { env: ["WEBPACK_HOST", "WEBPACK_DEV_HOST"], default: "localhost" },
  devPort: { env: "WEBPACK_DEV_PORT", default: 2992 },
  // Using a built-in reverse proxy, the webpack dev assets are served from the
  // same host and port as the app.  In that case, the URLs to assets are relative
  // without protocol, host, port.
  // However, user can simulate CDN server with the proxy and have assets URLs
  // specifying different host/port from the app.  To do that, the following
  // should be defined.
  cdnProtocol: { env: ["WEBPACK_DEV_CDN_PROTOCOL"], type: "string", default: null },
  cdnHostname: { env: ["WEBPACK_DEV_CDN_HOST"], type: "string", default: null },
  cdnPort: { env: ["WEBPACK_DEV_CDN_PORT"], default: 0 },
  //
  testPort: { env: "WEBPACK_TEST_PORT", default: 3001 },
  https: { env: "WEBPACK_DEV_HTTPS", default: false },
  devMiddleware: { env: "WEBPACK_DEV_MIDDLEWARE", default: false },
  // in dev mode, all webpack output are saved to memory only, but some files like
  // stats.json are needed by different uses and the stats partial saves a copy to
  // disk.  It will use this as the path to save the file.
  devArtifactsPath: { env: "WEBPACK_DEV_ARTIFACTS_PATH", default: ".etmp" },
  cssModuleSupport: { env: "CSS_MODULE_SUPPORT", type: "boolean", default: undefined },
  enableBabelPolyfill: { env: "ENABLE_BABEL_POLYFILL", default: false },
  enableNodeSourcePlugin: { env: "ENABLE_NODESOURCE_PLUGIN", default: false },
  enableHotModuleReload: { env: "WEBPACK_HOT_MODULE_RELOAD", default: true },
  enableWarningsOverlay: { env: "WEBPACK_DEV_WARNINGS_OVERLAY", default: true },
  woffFontInlineLimit: { env: "WOFF_FONT_INLINE_LIMIT", default: 1000 },
  preserveSymlinks: {
    env: ["WEBPACK_PRESERVE_SYMLINKS", "NODE_PRESERVE_SYMLINKS"],
    default: false
  },
  enableShortenCSSNames: { env: "ENABLE_SHORTEN_CSS_NAMES", default: true },
  optimizeCssOptions: {
    env: "OPTIMIZE_CSS_OPTIONS",
    type: "json",
    default: defaultOptimizeCssOptions
  },
  loadDlls: {
    env: "ELECTRODE_LOAD_DLLS",
    type: "json",
    default: {}
  },
  minify: {
    env: "WEBPACK_MINIFY",
    default: true
  }
};

const karmaConfigSpec = {
  browser: { env: "KARMA_BROWSER", default: "chrome" }
};

const babelConfigSpec = {
  enableTypeScript: { env: "ENABLE_BABEL_TYPESCRIPT", default: options.typescript || false },
  enableDynamicImport: { env: "ENABLE_DYNAMIC_IMPORT", default: false },
  enableFlow: { env: "ENABLE_BABEL_FLOW", default: true },
  // require the @flow directive in source to enable FlowJS type stripping
  flowRequireDirective: { env: "FLOW_REQUIRE_DIRECTIVE", default: false },
  proposalDecorators: { env: "BABEL_PROPOSAL_DECORATORS", default: false },
  legacyDecorators: { env: "BABEL_LEGACY_DECORATORS", default: true },
  transformClassProps: { env: "BABEL_CLASS_PROPS", default: false },
  looseClassProps: { env: "BABEL_CLASS_PROPS_LOOSE", default: true },
  envTargets: {
    env: "BABEL_ENV_TARGETS",
    type: "json",
    default: {
      //`default` and `node` targets object is required
      default: {
        ie: "8"
      },
      node: process.versions.node.split(".")[0]
    }
  },
  target: {
    env: "ENV_TARGET",
    type: "string",
    default: "default"
  },
  // `extendLoader` is used to override `babel-loader` only when `hasMultiTargets=true`
  extendLoader: {
    type: "json",
    default: {}
  }
};

const topConfigSpec = {
  devOpenBrowser: { env: "ELECTRODE_DEV_OPEN_BROWSER", default: false }
};
const typeScriptOption =
  options.typescript === false
    ? {
        babel: { enableTypeScript: options.typescript }
      }
    : {};

const config = {
  devDir,
  devPkg,
  devRequire,
  webpack: xenvConfig(webpackConfigSpec, userConfig.webpack, { merge }),
  karma: xenvConfig(karmaConfigSpec, userConfig.karma, { merge }),
  jest: Object.assign({}, userConfig.jest),
  babel: xenvConfig(babelConfigSpec, userConfig.babel, { merge }),
  config: Object.assign(
    {},
    {
      babel: `${configDir}/babel`,
      eslint: `${configDir}/eslint`,
      karma: `${configDir}/karma`,
      mocha: `${configDir}/mocha`,
      webpack: `${configDir}/webpack`,
      jest: `${configDir}/jest`
    },
    userConfig.configPaths
  )
};

module.exports = Object.assign(
  _.merge(config, typeScriptOption),
  xenvConfig(topConfigSpec, _.pick(userConfig, Object.keys(topConfigSpec)), { merge })
);

module.exports.babel.hasMultiTargets =
  Object.keys(module.exports.babel.envTargets)
    .sort()
    .join(",") !== "default,node";
