"use strict";
const { getXarcOptions } = require('../lib/utils')
require("../typedef");

/**
 * @param {CreateXarcOptions} [createXarcOptions] - configure default archetype options
 * @returns {object} options
 */
module.exports = function getArchetype(createXarcOptions) {
  const xarcOptions = getXarcOptions(createXarcOptions);
  const getOptions = require("./options");
  const loadDev = require("./load-dev");
  const archetypeConfig = getOptions(xarcOptions);
  loadDev(archetypeConfig, createXarcOptions);

  let AppMode;

  //
  // AppMode could cause circular dependency loading
  // Make it a get property so it's load after this file is processed
  //
  Object.defineProperty(archetypeConfig, "AppMode", {
    get() {
      if (!AppMode) {
        const makeAppMode = require("../lib/app-mode");
        AppMode = makeAppMode(archetypeConfig.prodDir, archetypeConfig.reactLib);
      }

      return AppMode;
    }
  });

  return archetypeConfig;
};
