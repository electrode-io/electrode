"use strict";

/* eslint-disable no-magic-numbers */

const Fs = require("fs");
const Path = require("path");
const archetype = require("@xarc/app-dev/config/archetype")();

module.exports = function notifyBundleValid() {
  setTimeout(() => {
    Fs.writeFileSync(Path.resolve(archetype.eTmpDir, "bundle.valid.log"), `${Date.now()}`);
  }, 100);
};
