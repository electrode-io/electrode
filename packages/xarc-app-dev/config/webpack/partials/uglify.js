"use strict";

//
// This partial used to use https://www.npmjs.com/package/uglifyjs-webpack-plugin to
// minize JS bundle for production.
// With webpack 4.0's built-in minification through the mode config, this is no longer
// needed, but kept for the nodeEnv option
// and other webpack 4 manual configurable optimization settings
// https://webpack.js.org/configuration/optimization/
//
// Also, the INSPECT_DEBUG and OPTIMIZE_STATS flags are deprecated in favor
// of the tool https://www.npmjs.com/package/source-map-explorer, use that to
// inspect your production bundle.
//

module.exports = function() {
  return {
    optimization: {
      nodeEnv: "production"
    }
  };
};
