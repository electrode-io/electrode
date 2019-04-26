"use strict";
const archetype = require("electrode-archetype-react-app/config/archetype");

module.exports = function() {
  return {
    mode: archetype.webpack.minify ? "production" : "development"
  };
};
