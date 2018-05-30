"use strict";

const hapiPlugin = require("./lib/hapi");
const middleware = require("./lib/express");
const ReactWebapp = require("./lib/react-webapp");
const AsyncTemplate = require("./lib/async-template");

module.exports = {
  register: hapiPlugin.register, // for hapi
  middleware, // for express
  hapiRegisterRoutes: hapiPlugin.registerRoutes,
  ReactWebapp,
  AsyncTemplate
};
