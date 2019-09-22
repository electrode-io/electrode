"use strict";

const generateConfig = require("./util/generate-config");

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

module.exports = {
  compose: generateConfig,
  env: profile,
  options
};
