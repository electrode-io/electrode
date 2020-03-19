"use strict";

const Path = require("path");

module.exports = function() {
  return {
    context: Path.resolve("test", "client"),
    entry: require.resolve("@xarc/app-dev/config/karma/entry")
  };
};
