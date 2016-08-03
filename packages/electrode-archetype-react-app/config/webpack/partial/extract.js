"use strict";

var archetype = require("../../archtype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;

var ExtractTextPlugin = archetype.devRequire("extract-text-webpack-plugin");
var CSSSplitPlugin = archetype.devRequire("css-split-webpack-plugin").default;

var autoprefixer = archetype.devRequire("autoprefixer-stylus");
var cssLoader = archetype.devRequire.resolve("css-loader");
var styleLoader = archetype.devRequire.resolve("style-loader");
var stylusLoader = archetype.devRequire.resolve("stylus-relative-loader");

module.exports = function () {
  return function (config) {
    var query = cssLoader + "?-autoprefixer!" + stylusLoader;
    return mergeWebpackConfig(config, {
      module: {
        loaders: [{
          name: "extract",
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract(styleLoader, query)
        }]
      },
      stylus: {
        use: [autoprefixer({browsers: ["last 2 versions", "ie >= 9", "> 5%"]})]
      },
      plugins: [
        new ExtractTextPlugin(config.__wmlMultiBundle
          ? "[name].style.[hash].css"
          : "style.[hash].css"),

        /*
        preserve: default: false. Keep the original unsplit file as well.
        Sometimes this is desirable if you want to target a specific browser (IE)
        with the split files and then serve the unsplit ones to everyone else.
         */
        new CSSSplitPlugin({size: 4000, imports: true, preserve: true})
      ]
    });
  };
};
