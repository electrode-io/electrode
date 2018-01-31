"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const Path = require("path");
const webpack = require("webpack");
const glob = require("glob");
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
const sassLoader = require.resolve("sass-loader");

/*
 * cssModuleSupport: false
 * case 1: *only* *.css => normal CSS
 * case 2: *only* *.styl exists => Stylus
 * case 3: *only* *.scss exists => SASS
 *
 * cssModulesSupport: true
 * case 1: *only* *.css => CSS-Modules + CSS-Next
 * case 2: *only* *.styl => normal CSS => CSS-Modules + CSS-Next
 * case 3: *only* *.scss => normal CSS => CSS-Modules + CSS-Next
 */

let cssModuleSupport = archetype.webpack.cssModuleSupport;
const cssModuleStylusSupport = archetype.webpack.cssModuleStylusSupport;
const AppMode = archetype.AppMode;

const cssLoaderOptions =
  "?modules&localIdentName=[name]__[local]___[hash:base64:5]&-autoprefixer";
const cssQuery = `${cssLoader}!${postcssLoader}`;
const stylusQuery = `${cssLoader}?-autoprefixer!${stylusLoader}`;
const scssQuery = `${cssQuery}!${sassLoader}`;
const cssModuleQuery = `${cssLoader}${cssLoaderOptions}!${postcssLoader}`;
const cssStylusQuery = `${cssLoader}${cssLoaderOptions}!${postcssLoader}!${stylusLoader}`;
const cssScssQuery = `${cssLoader}${cssLoaderOptions}!${postcssLoader}!${sassLoader}`;

const rules = [];

const cssExists = glob.sync(Path.resolve(AppMode.src.client, "**", "*.css")).length > 0;
const stylusExists = glob.sync(Path.resolve(AppMode.src.client, "**", "*.styl")).length > 0;
const scssExists = glob.sync(Path.resolve(AppMode.src.client, "**", "*.scss")).length > 0;

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
      process.env.NODE_ENV === "production" && new OptimizeCssAssetsPlugin(),
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
            use: () => {
              return !cssModuleSupport
                ? [
                    autoprefixer({
                      browsers: ["last 2 versions", "ie >= 9", "> 5%"]
                    })
                  ]
                : [];
            }
          }
        }
      })
    ].filter(x => !!x)
  };
};
