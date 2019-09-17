"use strict";

/* eslint-disable max-statements, complexity, global-require, no-magic-numbers */
/* eslint-disable no-console */

const { setupSubAppHapiRoutes } = require("./utils");

module.exports = {
  register: setupSubAppHapiRoutes,
  name: "subapp-server",
  version: "1.0.0"
};
