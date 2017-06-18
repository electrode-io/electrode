"use strict";

const FailPlugin = require("../plugins/fail-plugin");

module.exports = function() {
  return {
    plugins: [new FailPlugin()]
  };
};
