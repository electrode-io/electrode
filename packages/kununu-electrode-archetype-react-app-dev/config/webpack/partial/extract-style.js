
"use strict";

const archetype = require("kununu-electrode-archetype-react-app/config/archetype");
const Path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CSSSplitPlugin = require("css-split-webpack-plugin").default;

const atImport = require("postcss-import");
const cssnext = require("postcss-cssnext");

const autoprefixer = require("autoprefixer");
const cssLoader = require.resolve("css-loader");
const styleLoader = require.resolve("style-loader");
const sassLoader = require.resolve("sass-loader");
const postcssLoader = require.resolve("postcss-loader");

const AppMode = archetype.AppMode;

/**
 * [cssModuleSupport By default, this archetype assumes you are using SCSS + CSS-Modules + CSS-Next]
 *
 * Stylus is also supported for which the following cases can occur.
 *
 * case 1: *only* *.css exists => CSS-Modules + CSS-Next
 * case 2: *only* *.scss exists => SCSS + CSS-Modules + CSS-Next
 * case 3: *both* *.css & *.scss exists => SCSS + CSS-Modules + CSS-Next takes priority
 *          with a warning message
 */

const cssNextExists = (glob.sync(Path.resolve(AppMode.src.client, "**", "*.css")).length > 0);
const sassExists = (glob.sync(Path.resolve(AppMode.src.client, "**", "*.scss")).length > 0);

// By default, this archetype assumes you are using CSS-Modules + CSS-Next
const cssModuleSupport = sassExists && !cssNextExists;

module.exports = function () {
  const cssLoaderOptions = "?modules&localIdentName=[name]__[local]___[hash:base64:5]&-autoprefixer";
  const cssQuery = cssLoader + cssLoaderOptions + "!" + postcssLoader;
  const cssSassQuery = cssLoader + cssLoaderOptions + "!" + postcssLoader + "!" + sassLoader;

  // By default, this archetype assumes you are using CSS-Modules + CSS-Next
  const rules = [
    {
      _name: "extract-css",
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({ fallback: styleLoader, use: cssQuery, publicPath: "" })
    },
    {
      test: /main\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
      }),
    },
    {
      _name: "extract-css-sass",
      test: /((?!main).{4})\.scss$/,
      use: ExtractTextPlugin.extract({ fallback: styleLoader, use: cssSassQuery, publicPath: "" })
    }
  ];

  return {
    module: { rules },
    plugins: [
      new ExtractTextPlugin({ filename: "[name].style.[hash].css" }),

      /*
       preserve: default: false. Keep the original unsplit file as well.
       Sometimes this is desirable if you want to target a specific browser (IE)
       with the split files and then serve the unsplit ones to everyone else.
       */
      new CSSSplitPlugin({ size: 4000, imports: true, preserve: true }),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: Path.resolve(process.cwd(), "client"),
          postcss: () => {
            return cssModuleSupport ? [atImport, cssnext({
              browsers: ["last 2 versions", "ie >= 9", "> 5%"]
            })] : [];
          },
          sass: {
            use: () => {
              return !cssModuleSupport ? [autoprefixer({
                browsers: ["last 2 versions", "ie >= 9", "> 5%"]
              })] : [];
            }
          }
        }
      })
    ]
  };
};
