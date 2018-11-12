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

const demoAppPath = Path.resolve(process.cwd(), "..", "..", "demo-app");
const archetypeAppPath = Path.resolve(demoAppPath, "archetype", "config");

const archetypeApp = optionalRequire(archetypeAppPath) || { webpack: {}, options: {} };
const archetypeAppWebpack = archetypeApp.webpack;
let cssModuleSupport = archetypeAppWebpack.cssModuleSupport;
const cssModuleStylusSupport = archetypeAppWebpack.cssModuleStylusSupport;

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

const cssExists = glob.sync(Path.resolve(process.cwd(), "src/styles", "*.css")).length > 0;
const stylusExists = glob.sync(Path.resolve(process.cwd(), "src/styles", "*.styl")).length > 0;
const scssExists = glob.sync(Path.resolve(process.cwd(), "src/styles", "*.scss")).length > 0;

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

module.exports = function() {
  rules.push(
    {
      _name: `extract-css${cssModuleSupport ? "-modules" : ""}`,
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: cssModuleSupport ? [cssModuleQuery, postcssQuery] : [cssQuery, postcssQuery],
        publicPath: ""
      })
    },
    {
      _name: `extract-scss${cssModuleSupport ? "-modules" : ""}`,
      test: /\.(scss|sass)$/,
      use: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: cssModuleSupport
          ? [cssModuleQuery, postcssQuery, sassQuery]
          : [cssQuery, postcssQuery, sassQuery],
        publicPath: ""
      })
    },
    {
      _name: `extract${cssModuleSupport ? "-css" : ""}-stylus`,
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: cssModuleSupport
          ? [cssModuleQuery, postcssQuery, stylusQuery]
          : [cssQuery, postcssQuery, stylusQuery],
        publicPath: ""
      })
    }
  );

  /*
   *** cssModuleStylusSupport flag is about to deprecate. ***
   * If you want to enable stylus with CSS-Modules + CSS-Next,
   * Please use stylus as your style and enable cssModuleSupport flag instead.
   */
  if (cssModuleStylusSupport) {
    rules.push({
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
