/* eslint-disable @typescript-eslint/no-var-requires */

const archetype = require("@xarc/app-dev/config/archetype")();

// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};

module.exports = function() {
  return {
    mode: archetype.webpack.minify ? "production" : "development"
  };
};
