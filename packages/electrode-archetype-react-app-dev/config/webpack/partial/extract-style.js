"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const Path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CSSSplitPlugin = require("css-split-webpack-plugin").default;

const atImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");

const autoprefixer = require("autoprefixer");
const cssLoader = require.resolve("css-loader");
const styleLoader = require.resolve("style-loader");
const stylusLoader = require.resolve("stylus-relative-loader");
const postcssLoader = require.resolve("postcss-loader");

/*
 * cssModuleSupport: false
 *
 * - *.css => normal CSS
 * - *.styl => stylus compiled to normal CSS
 * - *.scss => SASS compiled to normal CSS
 *
 * cssModuleSupport: true
 *
 * - *.css => CSS-Modules + CSS-Next
 * - *.styl => stylus compiled to normal CSS => CSS-Modules + CSS-Next
 * - *.scss => SASS compiled to normal CSS => CSS-Modules + CSS-Next
 *
 * cssModuleSupport: undefined (default)
 *
 * - *only* *.css => cssModuleSupport sets to true
 * - *no* *.css (but *.styl or *.scss) => cssModuleSupport sets to false
 */

const cssModuleSupport = archetype.webpack.cssModuleSupport;
const cssModuleStylusSupport = archetype.webpack.cssModuleStylusSupport;

const rules = [];

/*
 * css Loader
 */
const cssQuery = {
  loader: cssLoader,
  options: {
    minimize: true
  }
};

/*
 * css-modules Loader
 */
const getCSSModuleOptions = () => {
  const enableShortenCSSNames = archetype.webpack.enableShortenCSSNames;
  const enableShortHash = process.env.NODE_ENV === "production" && enableShortenCSSNames;
  const localIdentName = `${enableShortHash ? "" : "[name]__[local]___"}[hash:base64:5]`;

  return {
    context: Path.resolve("src"),
    modules: true,
    localIdentName
  };
};

const cssModuleQuery = {
  loader: cssLoader,
  options: getCSSModuleOptions()
};

/*
 * postcss Loader
 *
 * Note:
 * - webpack requires an identifier (ident) in options
 * when {Function}/require is used (Complex Options).
 */
const browserslist = ["last 2 versions", "ie >= 9", "> 5%"];
const postcssQuery = {
  loader: postcssLoader,
  options: {
    ident: "postcss",
    plugins: loader => [
      autoprefixer({
        browsers: browserslist
      }),
      atImport({ root: loader.resourcePath }),
      postcssPresetEnv({ browsers: browserslist })
    ]
  }
};

/*
 * sass Loader
 */
const getSassLoader = () => {
  if (archetype.options.sass) {
    const sassLoader = require.resolve("sass-loader");
    return sassLoader;
  }
  return "";
};

const sassQuery = {
  loader: getSassLoader()
};

/*
 * stylus Loader
 */
const stylusQuery = {
  loader: stylusLoader
};

module.exports = function() {
  rules.push({
    _name: `extract-css${cssModuleSupport ? "-modules" : ""}`,
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: styleLoader,
      use: cssModuleSupport ? [cssModuleQuery, postcssQuery] : [cssQuery, postcssQuery],
      publicPath: ""
    })
  });

  if (archetype.options.sass) {
    rules.push({
      _name: `extract${cssModuleSupport ? "-css" : ""}-scss`,
      test: /\.(scss|sass)$/,
      use: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: cssModuleSupport
          ? [cssModuleQuery, postcssQuery, sassQuery]
          : [cssQuery, postcssQuery, sassQuery],
        publicPath: ""
      })
    });
  }

  rules.push({
    _name: `extract${cssModuleSupport ? "-css" : ""}-stylus`,
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
      fallback: styleLoader,
      use: cssModuleSupport
        ? [cssModuleQuery, postcssQuery, stylusQuery]
        : [cssQuery, postcssQuery, stylusQuery],
      publicPath: ""
    })
  });

  /*
  *** cssModuleStylusSupport flag is about to deprecate. ***
  * If you want to enable stylus with CSS-Modules + CSS-Next,
  * Please use stylus as your style and enable cssModuleSupport flag instead.
  */
  if (cssModuleStylusSupport) {
    rules.push({
      _name: "extract-css-stylus",
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: [cssModuleQuery, postcssQuery, stylusQuery],
        publicPath: ""
      })
    });
  }

  return {
    module: { rules },
    plugins: [
      new ExtractTextPlugin({ filename: "[name].style.css" }),
      process.env.NODE_ENV === "production" &&
        new OptimizeCssAssetsPlugin(archetype.webpack.optimizeCssOptions),
      /*
       preserve: default: false. Keep the original unsplit file as well.
       Sometimes this is desirable if you want to target a specific browser (IE)
       with the split files and then serve the unsplit ones to everyone else.
       */
      new CSSSplitPlugin({
        size: 4000,
        imports: true,
        preserve: true,
        defer: true
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        options: {
          context: Path.resolve("src")
        }
      })
    ].filter(x => !!x)
  };
};
