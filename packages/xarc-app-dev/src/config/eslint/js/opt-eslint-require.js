/* eslint-disable */
"use strict";

try {
  module.exports = require("require-at")(require.resolve("@xarc/opt-eslint/package.json"));
} catch {
  module.exports = require("require-at")(
    require.resolve("electrode-archetype-opt-eslint/package.json")
  );
}
