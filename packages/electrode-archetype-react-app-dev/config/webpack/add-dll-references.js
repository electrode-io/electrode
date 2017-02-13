"use strict";

var _ = require("lodash");
var fs = require("fs");
var glob = require("glob");
var webpack = require("webpack");
var archetype = require("../archetype");
var Path = archetype.Path;

module.exports = function (config) {
  try {
    var exists = fs.existsSync(Path.resolve(archetype.AppMode.src.client, "dll.config.js"));
    var filenames = glob.sync(Path.resolve("dll", "js", "*-manifest.*.json"));

    if (exists && filenames.length) {
      config.plugins = _.concat(config.plugins || [], filenames.map(function (filename) {
        var dll = new webpack.DllReferencePlugin({
          context: config.context,
          manifest: require(filename) // eslint-disable-line global-require
        });

        dll.__wmlDllReference = true;

        return dll;
      }));
    }
  } catch (err) {
    console.log("add-dll-references failed", err);
  }

  return config;
};
