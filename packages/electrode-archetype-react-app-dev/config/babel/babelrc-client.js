"use strict";

const requireAt = require("require-at");
const archetype = require("../archetype");

const {
  enableTypeScript,
  flowRequireDirective,
  enableFlow,
  transformClassProps,
  looseClassProps
} = archetype.babel;

//
// Resolve full path of a plugin that's the dependency of host npm package
//
function getPluginFrom(host, pluginName) {
  return requireAt(require.resolve(`${host}/package.json`)).resolve(pluginName);
}

const basePlugins = [
  "@babel/plugin-transform-template-literals",
  "@babel/plugin-transform-function-name",
  "@babel/plugin-transform-arrow-functions",
  "@babel/plugin-transform-block-scoped-functions",
  //
  // allow class properties. loose option compile to assignment expression instead
  // of Object.defineProperty.
  // Note: This must go before @babel/plugin-transform-classes
  //
  (enableTypeScript || transformClassProps) && [
    "@babel/plugin-proposal-class-properties",
    { loose: looseClassProps }
  ],
  "@babel/plugin-transform-classes",
  "@babel/plugin-transform-object-super",
  "@babel/plugin-transform-shorthand-properties",
  "@babel/plugin-transform-computed-properties",
  "@babel/plugin-transform-for-of",
  "@babel/plugin-transform-sticky-regex",
  "@babel/plugin-transform-unicode-regex",
  "@babel/plugin-transform-spread",
  "@babel/plugin-transform-parameters",
  "@babel/plugin-transform-destructuring",
  "@babel/plugin-transform-block-scoping",
  "@babel/plugin-transform-typeof-symbol",
  [
    "@babel/plugin-transform-regenerator",
    {
      async: false,
      asyncGenerators: false
    }
  ],
  "@babel/plugin-proposal-object-rest-spread",
  [
    "babel-plugin-i18n-id-hashing",
    {
      varsContainingMessages: ["defaultMessages", "translations"]
    }
  ],
  [
    "babel-plugin-react-intl",
    {
      messagesDir: "./tmp/messages/",
      enforceDescriptions: true
    }
  ],
  "transform-node-env-inline",
  "babel-plugin-lodash",
  "@babel/plugin-transform-runtime",
  enableFlow && [
    "@babel/plugin-transform-flow-strip-types",
    { requireDirective: flowRequireDirective }
  ]
];

const { BABEL_ENV, NODE_ENV } = process.env;

const enableCssModule = process.env.ENABLE_CSS_MODULE === "true";
const enableKarmaCov = process.env.ENABLE_KARMA_COV === "true";
const isProduction = (BABEL_ENV || NODE_ENV) === "production";
const isTest = (BABEL_ENV || NODE_ENV) === "test";

const plugins = basePlugins.concat(
  // test env
  isTest && ["babel-plugin-dynamic-import-node"],
  // production env
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
  enableCssModule && [
    [
      "babel-plugin-react-css-modules",
      {
        context: "./src",
        generateScopedName: `${isProduction ? "" : "[name]__[local]___"}[hash:base64:5]`,
        filetypes: {
          ".scss": {
            syntax: "postcss-scss",
            plugins: ["postcss-nested"]
          },
          ".styl": {
            syntax: "sugarss"
          }
        }
      }
    ]
  ],
  enableKarmaCov && [getPluginFrom("electrode-archetype-opt-karma", "babel-plugin-istanbul")]
);

const presets = [
  //
  // webpack 4 can handle ES modules now so turn off babel module transformation
  // in production mode to allow tree shaking.
  // But keep transforming modules to commonjs when not in production mode so tests
  // can continue to stub ES modules.
  //
  ["@babel/preset-env", { modules: isProduction ? false : "commonjs", loose: true }],
  enableTypeScript && "@babel/preset-typescript",
  "@babel/preset-react"
];

module.exports = {
  presets: presets.filter(x => x),
  plugins: plugins.filter(x => x)
};
