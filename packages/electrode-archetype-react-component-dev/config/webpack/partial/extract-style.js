"use strict";

const Path = require("path");
const optionalRequire = require("optional-require")(require);

const atImport = require("postcss-import");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer-stylus");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const styleLoader = require.resolve("style-loader");
const cssLoader = require.resolve("css-loader");
const postcssLoader = require.resolve("postcss-loader");
const stylusLoader = require.resolve("stylus-relative-loader");

const demoAppPath = Path.resolve(process.cwd(), "..", "..", "demo-app");
const archetypeAppPath = Path.resolve(demoAppPath, "archetype", "config");

const archetypeApp = optionalRequire(archetypeAppPath) || { webpack: {}, options: {} };

console.log("xxxxxxxxx", optionalRequire(archetypeAppPath));

const archetypeAppWebpack = archetypeApp.webpack;
const cssModuleSupport = archetypeAppWebpack.cssModuleSupport;
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
  console.log("xxxxxxxxxxxxxx", archetypeApp);
  if (archetypeApp.options.sass) {
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

  if (archetypeApp.options.sass) {
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
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        options: {
          context: Path.resolve("src")
        }
      })
    ].filter(x => !!x)
  };
};
