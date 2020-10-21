"use strict";

const failLoadDev = require("./lib/fail-load-dev");

// TODO: this is here for not breaking existing app
// in next major bump, apps should import loadXrunTasks from @xarc/app-dev
// - no more module.exports =
// - all ESM module
module.exports = function(...args) {
  let loadXrunTasks;

  try {
    loadXrunTasks = require("@xarc/app-dev");
  } catch (err) {
    failLoadDev(err);
  }

  return loadXrunTasks(...args);
};

const xAppRequire = require;

Object.defineProperties(module.exports, {
  xAppRequire: {
    value: xAppRequire
  },
  isomorphicLoader: {
    get() {
      return require("isomorphic-loader");
    }
  }
});
