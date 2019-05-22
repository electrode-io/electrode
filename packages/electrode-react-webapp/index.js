"use strict";

const hapiPlugin = require("./lib/hapi/");
const middleware = require("./lib/express");
const ReactWebapp = require("./lib/react-webapp");
const AsyncTemplate = require("./lib/async-template");

module.exports = {
  register: hapiPlugin.register || hapiPlugin, // for hapi
  pkg: hapiPlugin.pkg, // hapi 17
  middleware, // for express
  hapiRegisterRoutes: hapiPlugin.registerRoutes,
  ReactWebapp,
  AsyncTemplate,
  jsx: require("./lib/jsx")
};
