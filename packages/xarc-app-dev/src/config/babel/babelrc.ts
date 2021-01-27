/* eslint-disable @typescript-eslint/no-var-requires, no-console, @typescript-eslint/ban-ts-ignore */

/*
 * A single babel RC for all transpiling, including client and server code.
 * When transpiling for node.js, env XARC_BABEL_TARGET should be set to "node"
 * and this file will set preset-env targets accordingly.
 */
const ck = require("chalker");
const optionalRequire = require("optional-require")(require);
const optFlow = optionalRequire("electrode-archetype-opt-flow");
import { getPluginFrom, loadXarcOptions, detectCSSModule } from "./common";
const _ = require("lodash");

const xOptions = loadXarcOptions(process.env.XARC_CWD);

const isJest = Boolean(process.env.JEST_WORKER_ID);

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
  envTargets = {}
} = _.get(xOptions, "babel", {});

const addFlowPlugin = Boolean(enableFlow && optFlow);

const { BABEL_ENV, NODE_ENV, XARC_BABEL_TARGET, ENABLE_KARMA_COV } = process.env;

const enableCssModule = detectCSSModule(xOptions);
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

  const enableShortenCSSNames = xOptions.webpack.enableShortenCSSNames;
  const enableShortHash = isProduction && enableShortenCSSNames;
  return [
    [
      "babel-plugin-react-css-modules",
      {
        context: "./src",
        generateScopedName: `${enableShortHash ? "" : "[name]__[local]___"}[hash:base64:5]`,
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
  // plugin to transpile async/await to Promise
  // not for node.js because it has native async/await
  !isNodeTarget && [
    "module:fast-async",
    {
      compiler: {
        promises: true,
        generators: false
      },
      runtimePattern: null,
      useRuntimeModule: true
    }
  ],
  // allow decorators on class and method
  // Note: This must go before @babel/plugin-proposal-class-properties
  (enableTypeScript || proposalDecorators) && [
    "@babel/plugin-proposal-decorators",
    { legacy: legacyDecorators, ...proposalDecorators }
  ],
  //
  // allow class properties. loose option compile to assignment expression instead
  // of Object.defineProperty.
  // Note: This must go before @babel/plugin-transform-classes
  //
  (enableTypeScript || transformClassProps) && [
    "@babel/plugin-proposal-class-properties",
    { loose: looseClassProps, ...transformClassProps }
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
  "@babel/plugin-transform-runtime",
  addFlowPlugin && [
    "@babel/plugin-transform-flow-strip-types",
    { requireDirective: flowRequireDirective, ...enableFlow }
  ]
];

// @ts-ignore
const plugins = basePlugins.concat(
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

const target = isNodeTarget ? "node" : babelTarget;

const targets = envTargets[target];
if (!isJest) {
  const srcMsg = _.isEmpty(targets) ? " (will read from '.browserslistrc')" : "";
  console.log(
    ck`<orange>Babel preset-env compile targets: </><cyan>${JSON.stringify(targets)}</>${srcMsg}`
  );
}

const useBuiltIns =
  !isNodeTarget && hasMultiTargets
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
      // exclude these to allow fast-async to transpile async/await to promise
      // also is ok to exclude for node.js because it has native async/await
      exclude: ["transform-async-to-generator", "transform-regenerator"],
      //
      // We actually want/need auto.  Webpack understand import and ESM to do code splitting.
      // With commonjs, code splitting breaks.  The only reason we are trying to do commonjs
      // is because some apps have unit test that use sinon to modify ES6 module to fake exports
      // but ESM doesn't allow that.
      //
      // modules: isNodeTarget || isProduction || enableDynamicImport ? "auto" : "commonjs",
      modules: "auto",
      loose: true,
      targets,
      ...useBuiltIns
    }
  ],
  enableTypeScript && "@babel/preset-typescript",
  "@babel/preset-react"
];

export = {
  presets: presets.filter(x => x),
  plugins: plugins.filter(x => x)
};
