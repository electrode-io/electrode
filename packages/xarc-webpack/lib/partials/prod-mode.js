"use strict";
const archetype = require("@xarc/app/config/archetype")();

module.exports = function() {
  return {
    mode: archetype.webpack.minify ? "production" : "development"
  };
};
