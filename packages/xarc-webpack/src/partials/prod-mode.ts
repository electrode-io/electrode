"use strict";
const archetype = require("@xarc/app-dev/config/archetype")();

module.exports = function() {
  return {
    mode: archetype.webpack.minify ? "production" : "development"
  };
};
