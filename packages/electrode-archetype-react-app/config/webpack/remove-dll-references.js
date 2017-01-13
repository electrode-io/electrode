"use strict";

module.exports = function (config) {
  config.plugins = config.plugins.filter(function (plugin) {
    return !plugin.__wmlDllReference;
  });

  return config;
};
