/* eslint-disable @typescript-eslint/no-var-requires */

export { initWebpackConfigComposer, generateConfig as compose } from "./util/generate-config";

export { JsonpScriptSrcPlugin } from "./plugins/jsonp-script-src-plugin";
export { SubAppWebpackPlugin } from "./plugins/subapp-plugin";

//
// When xrun execute a build task that involves invoking webpack it
// will check if user wants webpack to start with their webpack.config.js
// If yes, then the task will set env ELECTRODE_WEBPACK_PROFILE to
// the desired profile, so when webpack runs, it's passed to the
// archetype, where we can check and load the correct internal
// webpack config accordingly.
//
export const env = process.env.ELECTRODE_WEBPACK_PROFILE || "production";
export const options = require(`./options/${env}`);

/**
 * The copy of webpack module that's installed for @xarc/webpack's use with its configs.
 *
 * If you need reference to webpack, say to get a plugin, you should use this copy instead
 * of getting it with `require("webpack")`.
 */
export const webpack = require("webpack");

const genPartials = require("./partials");

const ConfigPartial = require("webpack-config-composer/lib/partial");

/**
 * The webpack config partials this module provides for building a webapp
 */
export const partials = {
  /**
   * Some base webpack configuration
   */
  baseOptions: genPartials["_base-options"],
  /**
   * configuration to setup the app's entry code
   */
  entry: genPartials._entry,
  /**
   * setup for processing subapp chunks
   */
  subappChunks: genPartials["_subapp-chunks"],
  /**
   * setup whether to auto bundle source to simulate node.js APIs
   */
  node: genPartials._node,
  /**
   * setup the bundle code output
   */
  output: genPartials._output,
  /**
   * setup module resolution
   */
  resolve: genPartials._resolve,
  /**
   * setup resolveLoader option
   */
  resolveLoader: genPartials["_resolve-loader"],
  /**
   * setup subapp version 2 plugins and config
   */
  subapp2: genPartials["_subapp2"],
  /**
   * base setup for running Karma tests
   */
  karmaBase: genPartials["_test-base"],
  /**
   * setup for karma test entry
   */
  karmaEntry: genPartials["_test-entry"],
  /**
   * setup for karma test output
   */
  karmaOutput: genPartials["_test-output"],
  /**
   * setup for karma test module resolve
   */
  karmaResolve: genPartials["_test-resolve"],

  /**
   * setup to use babel and babel-loader to transpile code
   */
  babel: genPartials._babel,
  /**
   * setup CSS/styling support
   */
  extractStyle: genPartials["_extract-style"],
  /**
   * setup @loadable/webpack-plugin for dynamic import loadable components
   */
  loadable: genPartials._loadable,
  /**
   * setup loaders for font files like woff/woff2/eot/ttf
   */
  fonts: genPartials._fonts,
  /**
   * setup loaders for handling images like jpeg/png/gif/svg
   */
  images: genPartials._images,
  /**
   * setup loading non-js assets when running in SSR mode
   */
  isomorphic: genPartials._isomorphic,
  /**
   * setup for PWA functionalities
   */
  pwa: genPartials._pwa,
  /**
   * setup a plugin to capture stats and save as stats.json
   */
  statsWriter: genPartials._stats,
  /**
   * setup for optimizing code for production
   *
   * With webpack 4 this is not really needed given that webpack4 automatically
   * handles minification with the mode option.
   */
  minify: genPartials._uglify,
  /**
   * setup for locale support
   */
  locales: genPartials._locales,
  /**
   * setup a plugin that properly terminates webpack on failures
   */
  fail: genPartials._fail,

  /**
   * setup development tools and server
   */
  dev: genPartials._dev,
  dllEntry: genPartials["_dll-entry"],
  dllOutput: genPartials["_dll-output"],
  dllReference: genPartials["_dll-reference"],
  dllLoad: genPartials["_dll-load"],
  dll: genPartials._dll,
  /**
   * setup a plugin to do simple text base compile progress reporting
   */
  progressSimple: genPartials["_simple-progress"],
  /**
   * setup source maps to be inline
   */
  sourceMapsInline: genPartials["_sourcemaps-inline"],
  /**
   * setup source maps to be remote
   */
  sourceMapsRemote: genPartials["_sourcemaps-remote"],
  /**
   * set webpack to development mode
   */
  devMode: genPartials["_dev-mode"],
  /**
   * set webpack to production mode
   */
  prodMode: genPartials["_prod-mode"]
};

// support legacy custom webpack config from user
Object.assign(partials, genPartials);

/**
 * Some predefined profiles that specified a list of partials in arrays.
 *
 * These profiles are available:
 *   - base - the base for everything
 *   - production - partials that are for production build only
 *   - development - partials that are for development only
 *   - karma - partials that are for running karma tests only
 */
export const profiles = {
  /**
   * The base feature that include all the partials for a webapp.
   * These partials are included: baseOptions, entry, subappChunks,
   *   output, resolve, resolveLoader, babel, extractStyle, fonts,
   *   images, statsWriter, isomorphic, node
   */
  base: [
    partials.baseOptions,
    partials.entry,
    partials.subappChunks,
    partials.output,
    partials.resolve,
    partials.resolveLoader,
    partials.subapp2,
    partials.babel,
    partials.extractStyle,
    partials.fonts,
    partials.images,
    partials.statsWriter,
    partials.isomorphic,
    partials.node
  ],
  /**
   * Additional partials that are used for a production build
   */
  production: [
    partials.prodMode,
    partials.dllReference,
    partials.minify,
    partials.locales,
    partials.sourceMapsRemote,
    partials.progressSimple
  ],
  /**
   * Additional partials that are specific for a development build
   */
  development: [partials.devMode, partials.dev],
  /**
   * Additional partials that are specific for a build to run Karma tests
   */
  karma: [
    partials.devMode,
    partials.sourceMapsInline,
    partials.progressSimple,
    partials.karmaBase,
    partials.karmaEntry,
    partials.karmaOutput,
    partials.karmaResolve
  ]
};

/**
 * Ordinary plain object that holds a webpack config
 */
export type PlainConfig = Record<string, any>;

import * as WebpackComposer from "webpack-config-composer";

/**
 *
 * Apply an array of partial webpack configs into `config`
 *
 * The partials in the array is applied from left to right so the right ones override left ones.
 *
 * You can get predefined partials from this module.  For example, to add your own webpack config:
 *
 * In your `webpack.config.ts`:
 *
 * ```js
 * import { profiles, applyPartials } from "@xarc/webpack"
 *
 * const myConfig = applyPartials({
 *     // your base webpack configs that are OK to get override
 *   },
 *   [
 *     ...profiles.base,
 *     ...profiles.development,
 *     {
 *       // your own webpack config that will override
 *       // everything else goes here
 *     }
 *   ]
 * );
 *
 * export default myConfig;
 * ```
 *
 *
 * @param config - the base config (will not be mutated)
 * @param parts - array of partials to apply
 *
 * @returns a new config with all partials merged into `config`
 */
export function applyPartials(
  config: PlainConfig = {},
  parts: (PlainConfig | typeof ConfigPartial)[]
) {
  const composer = new WebpackComposer({ partials: parts });
  composer.addProfile("apply", {});
  let id = 1;
  parts.forEach(p => {
    if (p instanceof ConfigPartial) {
      composer.addPartialToProfile(p._name, "apply", p.config, p.options);
    } else {
      composer.addPartialToProfile(`object-${Date.now()}-${id++}`, "apply", p, {});
    }
  });
  return composer.compose(config, "apply");
}

/**
 * Provide out of the box default webpack configs for various modes:
 *
 * Available configs:
 *   - development() - for development
 *   - production() - for building production
 *   - karma() - for running karma tests
 */
export const defaultConfigs = {
  /**
   * generate webpack config for development
   *
   * Basically: `applyPartials({}, [...profiles.base, ...profiles.development])`
   * @param baseConfig - base config to merge into (not mutated)
   * @param moreParts - more partials to apply (will override)
   * @returns a new webpack config ready for use
   */
  development(
    baseConfig: PlainConfig = {},
    moreParts: (PlainConfig | typeof ConfigPartial)[] = []
  ) {
    return applyPartials(baseConfig, [...profiles.base, ...profiles.development, ...moreParts]);
  },

  /**
   * generate webpack config for production
   *
   * Basically: `applyPartials({}, [...profiles.base, ...profiles.production])`
   * @param baseConfig - base config to merge into (not mutated)
   * @param moreParts - more partials to apply (will override)
   * @returns a new webpack config ready for use
   */
  production(baseConfig: PlainConfig = {}, moreParts: (PlainConfig | typeof ConfigPartial)[] = []) {
    return applyPartials(baseConfig, [...profiles.base, ...profiles.production, ...moreParts]);
  },

  /**
   * generate webpack config for running karma tests
   *
   * Basically: `applyPartials({}, [...profiles.base, ...profiles.karma])`
   * @param baseConfig - base config to merge into (not mutated)
   * @param moreParts - more partials to apply (will override)
   * @returns a new webpack config ready for use
   */
  karma(baseConfig: PlainConfig = {}, moreParts: (PlainConfig | typeof ConfigPartial)[] = []) {
    return applyPartials(baseConfig, [...profiles.base, ...profiles.karma, moreParts]);
  }
};
