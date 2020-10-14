/* eslint-disable @typescript-eslint/no-var-requires */

import { loadXarcOptions } from "../util/load-xarc-options";

module.exports = function() {
  const xarcOptions = loadXarcOptions();

  return {
    mode: xarcOptions.webpack.minify ? "production" : "development"
  };
};
