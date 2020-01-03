"use strict";

let FrameworkLib;

module.exports = {
  getFramework(ref) {
    return new FrameworkLib(ref);
  },

  setupFramework(frameworkLib) {
    console.log("subapp-web setup framework for server");
    FrameworkLib = frameworkLib;
  }
};
