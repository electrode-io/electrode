/* eslint-disable @typescript-eslint/no-var-requires */

const { initWebpackConfigComposer, generateConfig } = require("./util/generate-config");

// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};

//
// When clap execute a build task that involves invoking webpack it
// will check if user wants webpack to start with their webpack.config.js
// If yes, then the task will set env ELECTRODE_WEBPACK_PROFILE to
// the desired profile, so when webpack runs, it's passed to the
// archetype, where we can check and load the correct internal
// webpack config accordingly.
//
const profile = process.env.ELECTRODE_WEBPACK_PROFILE || "production";
const options = require(`./options/${profile}`);
const partials = require("./partials");

module.exports = {
  initWebpackConfigComposer,
  compose: generateConfig,
  env: profile,
  options,
  partials
};
