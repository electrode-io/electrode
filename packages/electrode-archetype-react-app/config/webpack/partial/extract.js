"use strict";

var archetype = require("../../archetype");
var Path = archetype.PlatformPath;
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

var glob = archetype.devRequire("glob");
var ExtractTextPlugin = archetype.devRequire("extract-text-webpack-plugin");
var atImport = archetype.devRequire("postcss-import");
var cssnext = archetype.devRequire("postcss-cssnext");

var autoprefixer = archetype.devRequire("autoprefixer-stylus");
var cssLoader = archetype.devRequire.resolve("css-loader");
var styleLoader = archetype.devRequire.resolve("style-loader");
var stylusLoader = archetype.devRequire.resolve("stylus-relative-loader");
var postcssLoader = archetype.devRequire.resolve("postcss-loader");

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

var cssNextExists = (glob.sync(Path.join(process.cwd() + "/client/styles/*.css")).length > 0);
var stylusExists = (glob.sync(Path.join(process.cwd() + "/client/styles/*.styl")).length > 0);

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
    var loaders = [{
      name: "extract-css",
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(styleLoader, cssQuery)
    }];

    if (!cssModuleSupport) {
      loaders.push({
        name: "extract-stylus",
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract(styleLoader, stylusQuery)
      });
    }

    return mergeWebpackConfig(config, {
      module: {
        loaders: loaders
      },
      postcss: function () {
        return cssModuleSupport ? [atImport, cssnext({
          browsers: ["last 2 versions", "ie >= 9", "> 5%"]
        })] : [];
      },
      stylus: {
        use: function() {
          return !cssModuleSupport ? [autoprefixer({
            browsers: ["last 2 versions", "ie >= 9", "> 5%"]
          })] : [];
        }
      },
      plugins: [
        new ExtractTextPlugin("style.[hash].css")
      ]
    });
  };
};
