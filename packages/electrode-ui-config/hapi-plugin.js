"use strict";

const uiConfig = require("./lib/index");

function uiConfigRegister(server, options, next) {
  uiConfig._server = server;

  next();
}

uiConfigRegister.attributes = {
  name: "ui-config",
  version: "1.0.0"
};

module.exports = uiConfigRegister;
