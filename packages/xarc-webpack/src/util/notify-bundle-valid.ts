/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable no-magic-numbers */

import * as Fs from "fs";
import * as Path from "path";
import { loadXarcOptions } from "../util/load-xarc-options";

module.exports = function notifyBundleValid() {
  const archetype = loadXarcOptions();

  setTimeout(() => {
    Fs.writeFileSync(Path.resolve(archetype.eTmpDir, "bundle.valid.log"), `${Date.now()}`);
  }, 100);
};
