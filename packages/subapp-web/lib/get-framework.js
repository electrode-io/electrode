"use strict";

let FrameworkLib;

try {
  FrameworkLib = require("subapp-react").FrameworkLib;
} catch {}

module.exports = {
  getFramework(ref) {
    return new FrameworkLib(ref);
  },

  setupFramework(frameworkLib) {
    FrameworkLib = frameworkLib;
  }
};
