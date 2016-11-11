"use strict";
var path = require("path");
var assign = require("lodash/assign");
var archetype = require("../../archetype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var fileLoader = archetype.devRequire.resolve("file-loader");
var webAppManifestLoader = require.resolve("web-app-manifest-loader");
var SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
var FaviconsWebpackPlugin = require("favicons-webpack-plugin");


var swConfigPath = path.resolve(process.cwd(), "config/sw-config.js");

function getSWConfig() {
  var swConfig;

  try {
    swConfig = require(swConfigPath);
  } catch(err) {
    swConfig = {};
  }

  return swConfig;
}

module.exports = function () {
  return function (config) {
    var swConfig = getSWConfig();
    var manifestConfig = assign({
      background: "#FFFFFF",
      logo: "./images/electrode.png",
      title: "Electrode",
      statsFilename: "../server/iconstats.json"
    }, swConfig.manifest);
    var cacheConfig = assign({}, swConfig.cache);
    var precacheConfig = {
      staticFileGlobs: [
        "dist/js/*.{js,css,png,jpg,svg}",
        "dist/js/icons**/*.png"
      ],
      stripPrefix: "dist",
      cacheId: "electrode",
      filepath: "dist/sw.js",
      maximumFileSizeToCacheInBytes: 4194304
    };

    console.log(swConfigPath);
    console.log(swConfig);

    if (cacheConfig.runtimeCaching) {
      precacheConfig.runtimeCaching = cacheConfig.runtimeCaching.map(function(runtimeCache) {
        return {
          handler: runtimeCache.handler,
          urlPattern: runtimeCache.urlPattern
        }
      });
    }

    return mergeWebpackConfig(config, {
      module: {
        loaders: [
          {
            test: /manifest.json$/,
            loader: fileLoader + "?name=manifest.json!" + webAppManifestLoader
          }
        ]
      },
      plugins: [
        new FaviconsWebpackPlugin({
          logo: manifestConfig.logo,
          emitStats: true,
          inject: false,
          background: manifestConfig.background,
          title: manifestConfig.title,
          statsFilename: manifestConfig.statsFilename,
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: true,
            favicons: true
          }
        }),
        new SWPrecacheWebpackPlugin(precacheConfig)
      ]
    });
  };
};
