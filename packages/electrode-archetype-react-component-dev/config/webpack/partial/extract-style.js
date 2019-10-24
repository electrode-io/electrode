"use strict";

const Path = require("path");
const glob = require("glob");
const optionalRequire = require("optional-require")(require);

const atImport = require("postcss-import");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");

const styleLoader = require.resolve("style-loader");
const cssLoader = require.resolve("css-loader");
const postcssLoader = require.resolve("postcss-loader");
const stylusLoader = require.resolve("stylus-relative-loader");

const demoAppPath = Path.resolve("..", "..", "demo-app");
const archetypeAppPath = Path.resolve(demoAppPath, "archetype", "config");

const archetypeApp = optionalRequire(archetypeAppPath) || { webpack: {}, options: {} };
const archetypeAppWebpack = archetypeApp.webpack;
let cssModuleSupport = archetypeAppWebpack.cssModuleSupport;

/*
 * cssModuleSupport: false
 * case 1: *only* *.css => normal CSS
 * case 2: *only* *.styl exists => Stylus
 * case 3: *only* *.scss exists => SASS
 *
 * cssModuleSupport: true
 * case 1: *only* *.css => CSS-Modules + CSS-Next
 * case 2: *only* *.styl => normal CSS => CSS-Modules + CSS-Next
 * case 3: *only* *.scss => normal CSS => CSS-Modules + CSS-Next
 */

const globOpts = { cwd: Path.resolve("src/styles") };
const cssExists = glob.sync("*.css", globOpts).length > 0;
const stylusExists = glob.sync("*.styl", globOpts).length > 0;
const scssExists = glob.sync("*.scss", globOpts).length > 0;

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
  const enableShortenCSSNames = archetypeAppWebpack.enableShortenCSSNames;
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
const sassQuery = {
  loader: require.resolve("sass-loader")
};

/*
 * stylus Loader
 */
const stylusQuery = {
  loader: stylusLoader
};

/*
 * cssModuleSupport default to undefined
 *
 * when cssModuleSupport not specified:
 * *only* *.css, cssModuleSupport sets to true
 * *only* *.styl, cssModuleSupport sets to false
 * *only* *.scss, cssModuleSupport sets to false
 */
if (cssModuleSupport === undefined) {
  cssModuleSupport = cssExists && !stylusExists && !scssExists;
}

const sassSupport = true;
const stylusSupport = true;

const assert = require("assert");

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

  if (sassSupport) {
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

  if (stylusSupport) {
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
  }

  return {
    module: { rules },
    plugins: [
      new ExtractTextPlugin({ filename: "[name].style.[hash].css" }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        options: {
          context: Path.resolve("src")
        }
      })
    ].filter(x => !!x)
  };
};
