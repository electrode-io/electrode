/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable no-magic-numbers */

import * as Fs from "fs";
import * as Path from "path";
const archetype = require("@xarc/app-dev/config/archetype")();

module.exports = function notifyBundleValid() {
  setTimeout(() => {
    Fs.writeFileSync(Path.resolve(archetype.eTmpDir, "bundle.valid.log"), `${Date.now()}`);
  }, 100);
};
