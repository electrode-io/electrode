"use strict";

var archetype = require("../../archetype");
var Path = archetype.Path;
var mergeWebpackConfig = require("webpack-partial").default;

var glob = require("glob");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CSSSplitPlugin = require("css-split-webpack-plugin").default;
// TODO: fix postcss for webpack 2.0
// var atImport = require("postcss-import");
// var cssnext = require("postcss-cssnext");

var autoprefixer = require("autoprefixer-stylus");
var cssLoader = require.resolve("css-loader");
var styleLoader = require.resolve("style-loader");
var stylusLoader = require.resolve("stylus-relative-loader");
var postcssLoader = require.resolve("postcss-loader");

var AppMode = archetype.AppMode;

/**
 * [cssModuleSupport By default, this archetype assumes you are using CSS-Modules + CSS-Next]
 *
 * Stylus is also supported for which the following cases can occur.
 *
 * case 1: *only* *.css exists => CSS-Modules + CSS-Next
 * case 2: *only* *.styl exists => stylus
 * case 3: *both* *.css & *.styl exists => CSS-Modules + CSS-Next takes priority
 *          with a warning message
 * case 4: *none* *.css & *.styl exists => CSS-Modules + CSS-Next takes priority
 */

var cssNextExists = (glob.sync(Path.resolve(AppMode.src.client, "**", "*.css")).length > 0);
var stylusExists = (glob.sync(Path.resolve(AppMode.src.client, "**", "*.styl")).length > 0);

// By default, this archetype assumes you are using CSS-Modules + CSS-Next
var cssModuleSupport = true;

if (stylusExists && !cssNextExists) {
  cssModuleSupport = false;
} else if (stylusExists && cssNextExists) {
  /* eslint-disable no-console */
  console.log(`\n\n **** you have demo.css & demo.styl please delete *.styl
    and upgrade to using *.css for CSS-Modules + CSS-Next support **** \n\n`);
  /* eslint-enable no-console */
}

module.exports = function () {
  return function (config) {
    var stylusQuery = cssLoader + "?-autoprefixer!" + stylusLoader;
    var cssQuery = cssLoader + "?modules&-autoprefixer!" + postcssLoader;

    // By default, this archetype assumes you are using CSS-Modules + CSS-Next
    var rules = [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({fallback: styleLoader, use: cssQuery, publicPath: ""})
    }];

    if (!cssModuleSupport) {
      rules.push({
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({fallback: styleLoader, use: stylusQuery, publicPath: ""})
      });
    }

    if (cssModuleSupport) {
      rules.push({
        test: /\.scss$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              browsers: ["last 2 versions", "ie >= 9", "> 5%"]
            }
          }
        ]
      });
    } else {
      rules.push({
        test: /\.scss$/,
        use: [
          {
            loader: "autoprefixer-loader",
            options: {
              browsers: ["last 2 versions", "ie >= 9", "> 5%"]
            }
          }
        ]
      });
    }

    return mergeWebpackConfig(config, {
      module: {rules},
      // TODO: invalid with webpack 2.0
      // postcss: function () {
      //   return cssModuleSupport ? [atImport, cssnext({
      //     browsers: ["last 2 versions", "ie >= 9", "> 5%"]
      //   })] : [];
      // },
      // stylus: {
      //   use: function () {
      //     return !cssModuleSupport ? [autoprefixer({
      //       browsers: ["last 2 versions", "ie >= 9", "> 5%"]
      //     })] : [];
      //   }
      // },
      plugins: [
        new ExtractTextPlugin(
          {filename: config.__wmlMultiBundle ? "[name].style.[hash].css" : "style.[hash].css"}),

        /*
         preserve: default: false. Keep the original unsplit file as well.
         Sometimes this is desirable if you want to target a specific browser (IE)
         with the split files and then serve the unsplit ones to everyone else.
         */
        new CSSSplitPlugin({size: 4000, imports: true, preserve: true})
      ]
    });
  };
};
