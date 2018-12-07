"use strict";

const Path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const cssLoader = require.resolve("css-loader");
const postcssLoader = require.resolve("postcss-loader");
const styleLoader = require.resolve("style-loader");
const atImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const postcssPresetEnv = require("postcss-preset-env");

const getCSSModuleOptions = () => {
  const enableShortHash = process.env.NODE_ENV === "production";
  const localIdentName = `${enableShortHash ? "" : "[name]__[local]___"}[hash:base64:5]`;

  return {
    context: Path.resolve(""),
    modules: true,
    localIdentName
  };
};

const browserslist = ["last 2 versions", "ie >= 9", "> 5%"];

module.exports = {
  mode: "development",
  context: Path.resolve(""),
  resolve: {
    modules: ["src", process.cwd(), "node_modules"],
    extensions: [".js", ".jsx", ".json"]
  },
  // webpack configuration
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      // css module
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: styleLoader,
          use: [
            {
              loader: cssLoader,
              options: getCSSModuleOptions()
            },
            {
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
            }
          ],
          publicPath: ""
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin({ filename: "[name].style.[hash].css" })]
};
