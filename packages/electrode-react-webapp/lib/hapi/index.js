"use strict";

const { universalHapiPlugin, isHapi17 } = require("electrode-hapi-compat");

const hapi16 = require("./plugin16");
const hapi17 = require("./plugin17");
const pkg = require("../../package.json");

module.exports = universalHapiPlugin(
  {
    hapi16: hapi16.register,
    hapi17: hapi17.register
  },
  pkg
);

module.exports.registerRoutes = isHapi17() ? hapi17.registerRoutes : hapi16.registerRoutes;
