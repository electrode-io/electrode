"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const Path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const atImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");

const autoprefixer = require("autoprefixer");
const cssLoader = require.resolve("css-loader");
const stylusLoader = require.resolve("stylus-relative-loader");
const postcssLoader = require.resolve("postcss-loader");
const lessLoader = require.resolve("less-loader");
const isDevelopment = process.env.NODE_ENV !== "production";

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

const stylusRules = {
  _name: `extract${cssModuleSupport ? "-css" : ""}-stylus`,
  test: /\.styl$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { hmr: isDevelopment, reload: isDevelopment }
    },
    ...(cssModuleSupport
      ? [cssModuleQuery, postcssQuery, stylusQuery]
      : [cssQuery, postcssQuery, stylusQuery])
  ]
};

const lessQuery = {
  loader: lessLoader
};

const lessRules = {
  _name: `extract${cssModuleSupport ? "-css" : ""}-less`,
  test: /\.less$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { hmr: isDevelopment, reload: isDevelopment }
    },
    ...(cssModuleSupport
      ? [cssModuleQuery, postcssQuery, lessQuery]
      : [cssQuery, postcssQuery, lessQuery])
  ]
};

module.exports = function() {
  rules.push({
    _name: `extract-css${cssModuleSupport ? "-modules" : ""}`,
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: { hmr: isDevelopment, reload: isDevelopment }
      },
      ...(cssModuleSupport ? [cssModuleQuery, postcssQuery] : [cssQuery, postcssQuery])
    ]
  });

  if (archetype.options.sass) {
    rules.push({
      _name: `extract${cssModuleSupport ? "-css" : ""}-scss`,
      test: /\.(scss|sass)$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: { hmr: isDevelopment, reload: isDevelopment }
        },
        ...(cssModuleSupport
          ? [cssModuleQuery, postcssQuery, sassQuery]
          : [cssQuery, postcssQuery, sassQuery])
      ]
    });
  }

  rules.push(stylusRules);

  /*
   *** cssModuleStylusSupport flag is about to deprecate. ***
   * If you want to enable stylus with CSS-Modules + CSS-Next,
   * Please use stylus as your style and enable cssModuleSupport flag instead.
   */
  if (cssModuleStylusSupport) {
    rules.push({
      _name: "extract-css-stylus",
      test: /\.styl$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: { hmr: isDevelopment, reload: isDevelopment }
        },
        cssModuleQuery,
        postcssQuery,
        stylusQuery
      ]
    });
  }

  rules.push(lessRules);

  return {
    module: { rules },
    plugins: [
      new MiniCssExtractPlugin({
        filename: archetype.babel.hasMultiTargets ? "[name].style.css" : "[name].style.[hash].css"
      }),
      process.env.NODE_ENV === "production" &&
        new OptimizeCssAssetsPlugin(archetype.webpack.optimizeCssOptions),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        options: {
          context: Path.resolve("src")
        }
      })
    ].filter(x => !!x)
  };
};
