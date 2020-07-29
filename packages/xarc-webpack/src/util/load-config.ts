/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable global-require */

const { generateConfig } = require("./generate-config");

// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};

function loadConfig(envOpt) {
  const options = require(`../options/${envOpt}`);
  return generateConfig(options, true);
}

module.exports = loadConfig;
