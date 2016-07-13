"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
var mergeWebpackConfig = archDevRequire("webpack-partial").default;

var getDefaultEntry = function (entry) {
  return [
    "webpack-dev-server/client?http://dev.walmart.com:2992",
    "webpack/hot/only-dev-server",
    entry
  ];
};

var getMultiBundleEntry = function (entries) {
  var multiBundleEntry = {};
  for (var entryName in entries) {
    multiBundleEntry[entryName] = getDefaultEntry(entries[entryName]);
  }
  return multiBundleEntry;
};

module.exports = function () {
  return function (config) {
    var entry = config.__wmlMultiBundle ?
      getMultiBundleEntry(config.entry) :
      getDefaultEntry(config.entry);

    return mergeWebpackConfig(config, {
      devtool: "eval",
      entry: entry
    });
  };
};
