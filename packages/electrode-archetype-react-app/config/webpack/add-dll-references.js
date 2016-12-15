"use strict";

var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var glob = require("glob");
var webpack = require("webpack");

module.exports = function (config) {
  try {
    var exists = fs.accessSync(path.join(process.cwd(), "client/dll.config.js"));
    var filenames = glob.sync(path.join(process.cwd(), "dll/js/*-manifest.*.json"));

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
    //eslint-disable-line no-empty
  }

  return config;
};
