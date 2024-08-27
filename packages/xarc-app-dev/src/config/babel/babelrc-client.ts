/* eslint-disable @typescript-eslint/no-var-requires, no-console, @typescript-eslint/ban-ts-comment */

import { makeOptionalRequire } from "optional-require";
import { getPluginFrom, loadXarcOptions } from "./common";
import _ from "lodash";

const optionalRequire = makeOptionalRequire(require);
const optFlow = optionalRequire("electrode-archetype-opt-flow");
const xOptions = loadXarcOptions(process.env.XARC_CWD);

const {
  enableTypeScript,
  flowRequireDirective,
  enableFlow,
  proposalDecorators,
  legacyDecorators,
  transformClassProps,
  looseClassProps,
  hasMultiTargets,
  target: babelTarget,
  envTargets = {},
} = _.get(xOptions, "babel", {});

const addFlowPlugin = Boolean(enableFlow && optFlow);

const basePlugins = [
  // plugin to transpile async/await to Promise
  [
    "module:fast-async",
    {
      compiler: {
        promises: true,
        generators: false,
      },
      runtimePattern: null,
      useRuntimeModule: true,
    },
  ],
  // allow decorators on class and method
  // Note: This must go before @babel/plugin-proposal-transform-properties
  (enableTypeScript || proposalDecorators) && [
    "@babel/plugin-proposal-decorators",
    { legacy: legacyDecorators, ...proposalDecorators },
  ],
  //
  // allow class properties. loose option compile to assignment expression instead
  // of Object.defineProperty.
  // Note: This must go before @babel/plugin-transform-classes
  //
  (enableTypeScript || transformClassProps) && [
    "@babel/plugin-proposal-transform-properties",
    { loose: looseClassProps, ...transformClassProps },
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
  "transform-node-env-inline",
  "babel-plugin-lodash",
  "@babel/plugin-transform-runtime",
  addFlowPlugin && [
    "@babel/plugin-transform-flow-strip-types",
    { requireDirective: flowRequireDirective, ...enableFlow },
  ],
];

const { BABEL_ENV, NODE_ENV, ENABLE_KARMA_COV } = process.env;

const enableCssModule = Boolean(_.get(xOptions, "webpack.cssModuleSupport"));
const enableKarmaCov = ENABLE_KARMA_COV === "true";
const isProduction = (BABEL_ENV || NODE_ENV) === "production";
// const isTest = (BABEL_ENV || NODE_ENV) === "test";

// @ts-ignore
const plugins = basePlugins.concat(
  // production env
  isProduction && [
    "@babel/plugin-transform-react-constant-elements",
    [
      "babel-plugin-transform-react-remove-prop-types",
      {
        removeImport: true,
      },
    ],
  ],
  // css module support
  enableCssModule && [
    [
      "babel-plugin-react-css-modules",
      {
        context: "./src",
        generateScopedName: `${
          isProduction ? "" : "[name]__[local]___"
        }[hash:base64:5]`,
        filetypes: {
          ".scss": {
            syntax: "postcss-scss",
            plugins: ["postcss-nested"],
          },
          ".styl": {
            syntax: "sugarss",
          },
          ".less": {
            syntax: "postcss-less",
          },
        },
      },
    ],
  ],
  enableKarmaCov && [
    getPluginFrom(
      ["@xarc/opt-karma", "electrode-archetype-opt-karma"],
      "babel-plugin-istanbul"
    ),
  ]
);

const targets = envTargets[babelTarget];
const coreJsVersion = require("core-js/package.json").version.split(".")[0];
const useBuiltIns = hasMultiTargets
  ? { useBuiltIns: "entry", corejs: coreJsVersion }
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
      // exclude these to allow fast-async to transpile async/await to promise
      exclude: ["transform-async-to-generator", "transform-regenerator"],
      //
      // We actually want/need auto.  Webpack understand import and ESM to do code splitting.
      // With commonjs, code splitting breaks.  The only reason we are trying to do commonjs
      // is because some apps have unit test that use sinon to modify ES6 module to fake exports
      // but ESM doesn't allow that.
      //
      // modules: isProduction || enableDynamicImport ? "auto" : "commonjs",
      modules: "auto",
      loose: true,
      targets,
      ...useBuiltIns,
    },
  ],
  enableTypeScript && "@babel/preset-typescript",
  "@babel/preset-react",
];

export = {
  presets: presets.filter((x) => x),
  plugins: plugins.filter((x) => x),
};
