"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const Path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CSSSplitPlugin = require("css-split-webpack-plugin").default;

const atImport = require("postcss-import");
const cssnext = require("postcss-cssnext");

const autoprefixer = require("autoprefixer-stylus");
const cssLoader = require.resolve("css-loader");
const styleLoader = require.resolve("style-loader");
const stylusLoader = require.resolve("stylus-relative-loader");
const postcssLoader = require.resolve("postcss-loader");

const getSassLoader = () => {
  if (archetype.options.sass) {
    const sassLoader = require.resolve("sass-loader");
    return `!${sassLoader}`;
  }
  return "";
};

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

const cssModuleSupport = archetype.webpack.cssModuleSupport;
const cssModuleStylusSupport = archetype.webpack.cssModuleStylusSupport;
const enableShortenCSSNames = archetype.webpack.enableShortenCSSNames;

const enableShortHash = process.env.NODE_ENV === "production" && enableShortenCSSNames;
const localIdentName = `${enableShortHash ? "" : "[name]__[local]___"}[hash:base64:5]`;
const cssLoaderOptions = `?modules&localIdentName=${localIdentName}&-autoprefixer`;

const cssQuery = `${cssLoader}!${postcssLoader}`;
const stylusQuery = `${cssLoader}?-autoprefixer!${stylusLoader}`;
const scssQuery = `${cssQuery}${getSassLoader()}`;
const cssModuleQuery = `${cssLoader}${cssLoaderOptions}!${postcssLoader}`;
const cssStylusQuery = `${cssLoader}${cssLoaderOptions}!${postcssLoader}!${stylusLoader}`;
const cssScssQuery = `${cssLoader}${cssLoaderOptions}!${postcssLoader}${getSassLoader()}`;

const rules = [];

module.exports = function() {
  rules.push(
    {
      _name: `extract-css${cssModuleSupport ? "-modules" : ""}`,
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: cssModuleSupport ? cssModuleQuery : cssQuery,
        publicPath: ""
      })
    },
    {
      _name: `extract${cssModuleSupport ? "-css" : ""}-scss`,
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: cssModuleSupport ? cssScssQuery : scssQuery,
        publicPath: ""
      })
    },
    {
      _name: `extract${cssModuleSupport ? "-css" : ""}-stylus`,
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: cssModuleSupport ? cssStylusQuery : stylusQuery,
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
      _name: "extract-css-stylus",
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: cssStylusQuery,
        publicPath: ""
      })
    });
  }

  return {
    module: { rules },
    plugins: [
      new ExtractTextPlugin({ filename: "[name].style.[hash].css" }),
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
        options: {
          context: Path.resolve(process.cwd(), "src"),
          postcss: () => {
            return cssModuleSupport
              ? [
                  atImport,
                  cssnext({
                    browsers: ["last 2 versions", "ie >= 9", "> 5%"]
                  })
                ]
              : [];
          },
          stylus: {
            use: !cssModuleSupport
              ? [
                  autoprefixer({
                    browsers: ["last 2 versions", "ie >= 9", "> 5%"]
                  })
                ]
              : []
          }
        }
      })
    ].filter(x => !!x)
  };
};
