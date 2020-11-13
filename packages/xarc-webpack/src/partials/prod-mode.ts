/* eslint-disable @typescript-eslint/no-var-requires */

import { loadXarcOptions } from "@xarc/app-dev/lib/utils";

module.exports = function() {
  const xarcOptions = loadXarcOptions();

  return {
    mode: xarcOptions.webpack.minify ? "production" : "development"
  };
};
