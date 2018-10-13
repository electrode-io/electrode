"use strict";

const hapiPlugin = require("./lib/hapi");
const hapiPlugin17 = require("./lib/hapi/index17");
const middleware = require("./lib/express");
const ReactWebapp = require("./lib/react-webapp");
const AsyncTemplate = require("./lib/async-template");
const { isHapi17 } = require("electrode-hapi-compat");

module.exports = {
  register: isHapi17() ? hapiPlugin17.register : hapiPlugin.register, // for hapi
  pkg: isHapi17() ? hapiPlugin17.pkg : undefined,
  middleware, // for express
  hapiRegisterRoutes: hapiPlugin.registerRoutes,
  ReactWebapp,
  AsyncTemplate
};
