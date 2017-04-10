"use strict";

const Path = require("path");

module.exports = function() {
  var karmaEntry = require.resolve("electrode-archetype-react-component/config/karma/entry");

  return {
    context: Path.join(process.cwd(), "test/client"),
    entry: karmaEntry
  };
};
