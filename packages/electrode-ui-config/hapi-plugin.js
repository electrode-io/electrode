"use strict";

const uiConfig = require("./lib");

//
// On the server we need to acquire the config from the server object
// For Electrode Server, the config is in server.app.config
//
function uiConfigRegister(server, options, next) {
  uiConfig.config = (server.app && server.app.config) || {};

  next();
}

uiConfigRegister.attributes = {
  name: "ui-config",
  version: "1.0.0"
};

module.exports = uiConfigRegister;
