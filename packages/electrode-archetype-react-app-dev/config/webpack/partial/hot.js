"use strict";

const archetype = require("../../archetype");
const mergeWebpackConfig = require("webpack-partial").default;

const getDefaultEntry = function (entry) {
  return [
    `webpack-dev-server/client?http://${archetype.webpack.devHostname}:${archetype.webpack.devPort}`,
    "webpack/hot/only-dev-server",
    entry
  ];
};

const getMultiBundleEntry = function (entries) {
  const multiBundleEntry = {};
  for (const entryName in entries) {
    multiBundleEntry[entryName] = getDefaultEntry(entries[entryName]);
  }
  return multiBundleEntry;
};

module.exports = function () {
  return function (config) {
    const entry = typeof config.entry === "object" ?
      getMultiBundleEntry(config.entry) :
      getDefaultEntry(config.entry);

    return mergeWebpackConfig(config, {
      devtool: "eval",
      entry
    });
  };
};
