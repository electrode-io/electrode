/* eslint-disable @typescript-eslint/no-var-requires */

const FailPlugin = require("../plugins/fail-plugin");

// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};

module.exports = function() {
  return {
    plugins: [new FailPlugin()]
  };
};
