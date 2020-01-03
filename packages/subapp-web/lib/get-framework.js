"use strict";

let FrameworkLib;

module.exports = {
  getFramework(ref) {
    return new FrameworkLib(ref);
  },

  setupFramework(frameworkLib) {
    FrameworkLib = frameworkLib;
  }
};
