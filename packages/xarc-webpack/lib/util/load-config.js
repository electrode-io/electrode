"use strict";

/* eslint-disable global-require */

const { generateConfig } = require("./generate-config");

function loadConfig(envOpt) {
  const options = require(`../options/${envOpt}`);
  return generateConfig(options, true);
}

module.exports = loadConfig;
