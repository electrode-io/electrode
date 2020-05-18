"use strict";
const { getXarcOptions } = require('../lib/utils')
require("../typedef");

let cachedArchetype = null;
/**
 * Access the archetype singleton. Creates the archetype on first call, otherwise
 * returns the cached version.
 * @param {CreateXarcOptions} [createXarcOptions] - configure default archetype options
 * @returns {object} options
 */
module.exports = function getArchetype(createXarcOptions) {
  if (cachedArchetype) {
    cachedArchetype._fromCache = true;
    // maintained for backwards compatibility
    return cachedArchetype;
  }
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

  cachedArchetype = archetypeConfig;
  return cachedArchetype;
};
