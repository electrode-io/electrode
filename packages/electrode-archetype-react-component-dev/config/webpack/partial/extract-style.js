"use strict";

const Path = require("path");
const glob = require("glob");

const atImport = require("postcss-import");
const cssnext = require("postcss-cssnext");
const styleLoader = require.resolve("style-loader");
const cssLoader = require.resolve("css-loader");
const postcssLoader = require.resolve("postcss-loader");
const stylusLoader = require.resolve("stylus-relative-loader");
const webpack = require("webpack");

const optionalRequire = require("optional-require")(require);
const configPath = Path.resolve("archetype", "config.js");
const config = optionalRequire(configPath);
const cssModuleStylusSupport = config && config.cssModuleStylusSupport;

/**
 * [cssModuleSupport By default, this archetype assumes you are using CSS-Modules + CSS-Next]
 *
 * Stylus is also supported for which the following cases can occur.
 *
 * case 1: *only* demo.css exists => CSS-Modules + CSS-Next
 * case 2: *only* demo.styl exists => stylus
 * case 3: *both* demo.css & demo.styl exists => CSS-Modules + CSS-Next takes priority
 *          with a warning message
 * case 4: *none* demo.css & demo.styl exists => CSS-Modules + CSS-Next takes priority
 * case 5: *cssModuleStylusSupport
 */

const cssNextExists = glob.sync(Path.join(process.cwd() + "/demo/*.css")).length > 0;
const stylusExists = glob.sync(Path.join(process.cwd() + "/demo/*.styl")).length > 0;

// By default, this archetype assumes you are using CSS-Modules + CSS-Next
let cssModuleSupport = "?modules!" + postcssLoader;

if (stylusExists && !cssNextExists) {
  cssModuleSupport = "";
} else if (stylusExists && cssNextExists) {
  /* eslint-disable no-console */
  console.log(`**** you have demo.css & demo.styl please delete *.styl
    and upgrade to using *.css for CSS-Modules + CSS-Next support ****`);
  /* eslint-enable no-console */
}

module.exports = function() {
  const loaders = [{
    test: /\.css$/,
    /* eslint-disable prefer-template */
    loader: styleLoader + "!" + cssLoader + cssModuleSupport
    /* eslint-enable prefer-template */
  }];

  if (cssModuleStylusSupport) {
    loaders.push({
      test: /\.styl$/,
      /* eslint-disable prefer-template */
      loader: styleLoader + "!" + cssLoader + "?modules!" + stylusLoader
      /* eslint-enable prefer-template */
    });
  } else {
    loaders.push({
      test: /\.styl$/,
      /* eslint-disable prefer-template */
      loader: styleLoader + "!" + cssLoader + "!" + stylusLoader
      /* eslint-enable prefer-template */
    });
  }

  return {
    module: {
      rules: loaders
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          stylus: {
            define: {
              $tenant: process.env.ELECTRODE_TENANT || "walmart"
            }
          }
        }
      })
    ]
  }
};
