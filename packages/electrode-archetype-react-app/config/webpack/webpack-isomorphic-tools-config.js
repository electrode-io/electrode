"use strict";

var WebpackIsomorphicToolsPlugin = require("webpack-isomorphic-tools/plugin");

module.exports = {
  // set debug: true if want to see debug logs from the plugin
  "webpack_assets_file_path": "../dist/webpack-assets.json",
  // the stats file is created if debug is true
  "webpack_stats_file_path": "../dist/webpack-stats.json",
  assets: {
    images: {
      extensions: [
        "jpeg",
        "jpg",
        "png",
        "gif",
        "svg"
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: [
        "woff",
        "woff2",
        "ttf",
        "eot"
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    }
  }
};
