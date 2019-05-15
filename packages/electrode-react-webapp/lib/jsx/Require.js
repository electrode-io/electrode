"use strict";

const processToken = require("./process-token");

function Require(props, context, scope) {
  return processToken(props, context, scope, true);
}

module.exports = Require;
