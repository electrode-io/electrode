"use strict";

/**
 * This helper attempts to return a root level webpack config for the given file.
 */

var path = require("path");

module.exports = function (rootConfigFileName) {
  var rootConfig;

  try {
    rootConfig = require( // eslint-disable-line global-require
      path.join(process.cwd(), rootConfigFileName)
    );
  } catch (err) {
    rootConfig = {};
  }

  return rootConfig;
};
