"use strict";

var prodCfg = require("../webpack.config");

module.exports = function() {
  return {
    resolveLoader: prodCfg.resolveLoader
  };
};
