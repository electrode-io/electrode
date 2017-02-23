"use strict";

const _ = require("lodash");
const fs = require("fs");
const glob = require("glob");
const webpack = require("webpack");
const archetype = require("../archetype");
const Path = archetype.Path;

module.exports = function (config) {
  try {
    const exists = fs.existsSync(Path.resolve(archetype.AppMode.src.client, "dll.config.js"));
    const filenames = glob.sync(Path.resolve("dll", "js", "*-manifest.*.json"));

    if (exists && filenames.length) {
      config.plugins = _.concat(config.plugins || [], filenames.map((filename) => {
        const dll = new webpack.DllReferencePlugin({
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
