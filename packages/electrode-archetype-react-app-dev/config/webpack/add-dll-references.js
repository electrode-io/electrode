"use strict";

const _ = require("lodash");
const fs = require("fs");
const glob = require("glob");
const webpack = require("webpack");
const archetype = require("../archetype");
const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: "electrode",
  src: true,
  streams: [
    {
      level: 'error',
      path: './bunyan-logs.json'
    }
  ]
});

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
    log.error(err.message);
  }

  return config;
};
