"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");

const getDefaultEntry = function(entry) {
  return [
    `webpack-dev-server/client?http://${archetype.webpack.devHostname}:${
      archetype.webpack.devPort
    }`,
    "webpack/hot/only-dev-server",
    entry
  ];
};

const getMultiBundleEntry = function(entries) {
  const multiBundleEntry = {};
  for (const entryName in entries) {
    multiBundleEntry[entryName] = getDefaultEntry(entries[entryName]);
  }
  return multiBundleEntry;
};

module.exports = function(options) {
  const config = options.currentConfig;
  const entry =
    typeof config.entry === "object"
      ? getMultiBundleEntry(config.entry)
      : getDefaultEntry(config.entry);

  return {
    devtool: "eval",
    entry
  };
};
