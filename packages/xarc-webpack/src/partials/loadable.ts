/* eslint-disable @typescript-eslint/no-var-requires */

import { loadXarcOptions } from "../util/load-xarc-options";
import * as LoadablePlugin from "@loadable/webpack-plugin";

module.exports = function() {
  const xarcOptions = loadXarcOptions();
  return {
    plugins: xarcOptions.babel.enableDynamicImport
      ? [new LoadablePlugin({ filename: "../server/loadable-stats.json" })]
      : []
  };
};
