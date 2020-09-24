/* eslint-disable @typescript-eslint/no-var-requires, no-console, @typescript-eslint/ban-ts-ignore */

/*
 * A single babel RC for all transpiling, including client and server code.
 * When transpiling for node.js, env XARC_BABEL_TARGET should be set to "node"
 * and this file will set preset-env targets accordingly.
 */
const requireAt = require("require-at");
const ck = require("chalker");
const archetype = require("@xarc/app-dev/config/archetype")();
const optionalRequire = require("optional-require")(require);
const optFlow = optionalRequire("electrode-archetype-opt-flow");
import { getPluginFrom } from "./common";

const isJest = Boolean(process.env.JEST_WORKER_ID);

const {
  enableTypeScript,
  flowRequireDirective,
  enableFlow,
  proposalDecorators,
  legacyDecorators,
  transformClassProps,
  looseClassProps,
  enableDynamicImport
} = archetype.babel;

const addFlowPlugin = Boolean(enableFlow && optFlow);

const fileId = "xarc-app-dev:babelrc.js";

const checkEnv = names => {
  names = names.filter(x => !process.env.hasOwnProperty(x));
  if (!isJest && names.length > 0) {
    console.error(
      ck`\n<red>Notice:</> ${fileId}: env ${names.join(", ")} not defined - default to 'false'\n`
    );
  }
};

checkEnv(["ENABLE_CSS_MODULE", "ENABLE_KARMA_COV"]);

const { BABEL_ENV, NODE_ENV, XARC_BABEL_TARGET, ENABLE_CSS_MODULE, ENABLE_KARMA_COV } = process.env;

const enableCssModule = ENABLE_CSS_MODULE === "true";
const enableKarmaCov = ENABLE_KARMA_COV === "true";
const isProduction = (BABEL_ENV || NODE_ENV) === "production";
const isTest = (BABEL_ENV || NODE_ENV) === "test";
const isNodeTarget = XARC_BABEL_TARGET === "node";

/**
 * https://www.npmjs.com/package/babel-plugin-react-css-modules
 *
 * This plugin enhances the CSS module support from css-loader.  It adds a new
 * prop styleName in addition to the className prop.  This also automatically
 * make it work for SSR.
 *
 * Currently, looks like the author has been inactive on maintaining this plugin
 * and there's some compatibility issue with css-loader 4.x.
 * https://github.com/gajus/babel-plugin-react-css-modules/issues/291
 *
 * Resolution: TBD
 */
const getReactCssModulePlugin = () => {
  if (!enableCssModule) {
    return null;
  }

  const postCssPath = optionalRequire.resolve("@xarc/opt-postcss/package.json");

  if (!postCssPath) {
    return null;
  }

  const babelReactCssModulePlugin = requireAt(postCssPath)("babel-plugin-react-css-modules");

  return [
    [
      babelReactCssModulePlugin,
      {
        generateScopedName: `${isProduction ? "" : "[name]__[local]___"}[hash:base64:5]`,
        filetypes: {
          ".scss": {
            syntax: "postcss-scss",
            plugins: ["postcss-nested"]
          },
          ".styl": {
            syntax: "sugarss"
          },
          ".less": {
            syntax: "postcss-less"
          }
        }
      }
    ]
  ];
};

const basePlugins = [
  !isNodeTarget && enableDynamicImport && "@babel/plugin-syntax-dynamic-import",
  // add plugin for loadable component
  // Note: this is needed for server side (node.js) also.
  enableDynamicImport && "@loadable/babel-plugin",
  // allow decorators on class and method
  // Note: This must go before @babel/plugin-proposal-class-properties
  (enableTypeScript || proposalDecorators) && [
    "@babel/plugin-proposal-decorators",
    { legacy: legacyDecorators }
  ],
  //
  // allow class properties. loose option compile to assignment expression instead
  // of Object.defineProperty.
  // Note: This must go before @babel/plugin-transform-classes
  //
  (enableTypeScript || transformClassProps) && [
    "@babel/plugin-proposal-class-properties",
    { loose: looseClassProps }
  ],
  //
  // i18n has not been used at all and these are very outdated
  // remove them for now until they can be updated
  //
  // [
  //   "babel-plugin-i18n-id-hashing",
  //   {
  //     varsContainingMessages: ["defaultMessages", "translations"]
  //   }
  // ],
  // [
  //   "babel-plugin-react-intl",
  //   {
  //     messagesDir: "./tmp/messages/",
  //     enforceDescriptions: true
  //   }
  // ],
  !isNodeTarget && "transform-node-env-inline",
  !isNodeTarget && "babel-plugin-lodash",
  !isNodeTarget && "@babel/plugin-transform-runtime",
  addFlowPlugin && [
    "@babel/plugin-transform-flow-strip-types",
    { requireDirective: flowRequireDirective }
  ]
];

// @ts-ignore
const plugins = basePlugins.concat(
  // test env
  isTest && ["babel-plugin-dynamic-import-node"],
  // production env
  !isNodeTarget &&
    isProduction && [
      "@babel/plugin-transform-react-constant-elements",
      [
        "babel-plugin-transform-react-remove-prop-types",
        {
          removeImport: true
        }
      ]
    ],
  // css module support
  // Note: this is needed for server side (node.js) also.
  getReactCssModulePlugin(),
  !isNodeTarget &&
    enableKarmaCov && [
      getPluginFrom(["@xarc/opt-karma", "electrode-archetype-opt-karma"], "babel-plugin-istanbul")
    ]
);

const target = isNodeTarget ? "node" : archetype.babel.target;

const targets = archetype.babel.envTargets[target];
if (!isJest) {
  console.log(ck`<orange>Babel preset-env compile targets: </><cyan>${JSON.stringify(targets)}</>`);
}

const useBuiltIns =
  !isNodeTarget && archetype.babel.hasMultiTargets
    ? { useBuiltIns: "entry", corejs: require("core-js/package.json").version.split(".")[0] }
    : {};

const presets = [
  //
  // webpack 4 can handle ES modules now so turn off babel module transformation
  // in production mode to allow tree shaking.
  // But keep transforming modules to commonjs when not in production mode so tests
  // can continue to stub ES modules.
  //
  [
    "@babel/preset-env",
    {
      modules: isNodeTarget || isProduction || enableDynamicImport ? "auto" : "commonjs",
      loose: true,
      targets,
      ...useBuiltIns
    }
  ],
  enableTypeScript && "@babel/preset-typescript",
  "@babel/preset-react"
];

module.exports = {
  presets: presets.filter(x => x),
  plugins: plugins.filter(x => x)
};
