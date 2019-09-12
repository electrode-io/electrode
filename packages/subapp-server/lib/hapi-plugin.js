"use strict";

/* eslint-disable max-statements, complexity, global-require, no-magic-numbers */
/* eslint-disable no-console */

const { universalHapiPlugin } = require("electrode-hapi-compat");
const { setupSubAppHapiRoutes, legacyPlugin } = require("./utils");

module.exports = universalHapiPlugin(
  {
    hapi16: legacyPlugin,
    hapi17: setupSubAppHapiRoutes
  },
  {
    name: "subapp-server",
    version: "1.0.0"
  }
);
