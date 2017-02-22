"use strict";

module.exports = function (config) {
  config.plugins = config.plugins.filter((plugin) => {
    return !plugin.__wmlDllReference;
  });

  return config;
};
