"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;

var ExtractTextPlugin = archDevRequire("extract-text-webpack-plugin");
var CSSSplitPlugin = archDevRequire("css-split-webpack-plugin").default;

var autoprefixer = archDevRequire("autoprefixer-stylus");
var cssLoader = archDevRequire.resolve("css-loader");
var styleLoader = archDevRequire.resolve("style-loader");
var stylusLoader = archDevRequire.resolve("stylus-relative-loader");

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
