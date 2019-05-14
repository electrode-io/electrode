"use strict";

const processToken = require("./process-token");

function Token(props, context, scope) {
  return processToken(props, context, scope);
}

module.exports = Token;
