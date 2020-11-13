/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";
import { loadXarcOptions } from "@xarc/app-dev/lib/utils";

module.exports = () => {
  const xarcOptions = loadXarcOptions();
  const AppMode = xarcOptions.AppMode;

  const clientDllConfig = require(Path.resolve(AppMode.src.client, "dll.config.js"));

  return {
    entry: clientDllConfig
  };
};
