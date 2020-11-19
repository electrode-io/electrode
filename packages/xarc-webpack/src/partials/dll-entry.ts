/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";
import { loadXarcOptions } from "../util/load-xarc-options";
const { detectXARCPath } = require("@xarc/app-dev/lib/utils");

module.exports = () => {
  const xarcOptions = loadXarcOptions();
  const AppMode = xarcOptions.AppMode;
  const xarcPath = detectXARCPath(xarcOptions.XARC_CWD);
  const clientDllConfig = require(Path.resolve(xarcPath, AppMode.src.client, "dll.config.js"));

  return {
    entry: clientDllConfig
  };
};
