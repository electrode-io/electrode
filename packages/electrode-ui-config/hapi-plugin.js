"use strict";

const { universalHapiPlugin } = require("electrode-hapi-compat");

const uiConfig = require("./lib");
const pkg = require("./package.json");

//
// On the server we need to acquire the config from the server object
// For Electrode Server, the config is in server.app.config
//
function uiConfigRegister(server, options, next) {
  uiConfig.config = (server.app && server.app.config) || {};

  next && next();
}

uiConfigRegister.attributes = {
  name: "ui-config",
  version: "1.0.0"
};

module.exports = uiConfigRegister;

module.exports = universalHapiPlugin(
  {
    hapi16: uiConfigRegister,
    hapi17: uiConfigRegister
  },
  pkg
);
