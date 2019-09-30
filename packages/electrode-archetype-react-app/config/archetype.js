"use strict";

const options = require("./options");
const loadDev = require("./load-dev");

loadDev(options);

let AppMode;

//
// AppMode could cause circular dependency loading
// Make it a get property so it's load after this file is processed
//
Object.defineProperty(options, "AppMode", {
  get() {
    if (!AppMode) {
      const makeAppMode = require("../lib/app-mode");
      AppMode = makeAppMode(options.prodDir, options.reactLib);
    }

    return AppMode;
  }
});

module.exports = options;
