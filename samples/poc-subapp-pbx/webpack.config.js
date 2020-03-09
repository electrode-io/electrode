//
// To get Electrode to load this webpack.config.js file, set the env USE_APP_WEBPACK_CONFIG to true.
// See it being set in xclap.js for this sample.
//
"use strict";

const { initWebpackConfigComposer, compose, options } = require("@xarc/app-dev/config/webpack");

//
// options contains information pertain to Electrode's internal webpack
// partials and profiles, so in order to get those, it should be passed
// to initWebpackConfigComposer.
//
const { composer, ...opts } = initWebpackConfigComposer(options);

//
// Electrode webpack config partials names all start with _
//
// During final compose phase, each partial will be invoked to get its config.
// If a partial has an override callback, then it will be called with the
// partial config.  The callback should customize and return the config as
// desired.  It can return a completely new config as well.
//
// Each partial's config will be merged into the final config as it's
// received.  Electrode specified the order its internal partials should be
// invoked.
//
// The options normally contains only the field currentConfig, which is the
// webpack config already created so far.  The partial override should not
// mutate currentConfig.
//
composer.getPartial("_dev").setOverride((config, options) => {
  // Electrode default devtool to inline-source-map, which could be
  // kind of slow, so override it with eval-source-map, which is a little faster
  return { ...config, devtool: "eval-source-map" };
});

//
// compose function runs the composer.compose method with some house keeping
// logic that pertains to Electrode's internal webpack config partials, such
// as removing the custom _name field to identify webpack plugins.
//
const finalConfig = compose({ composer, ...opts });

// final config can be override or even modified at will:

finalConfig.devtool = "eval-source-map";

module.exports = finalConfig;
