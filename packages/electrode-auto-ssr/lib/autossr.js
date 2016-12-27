"use strict";

const machineLoadCondition = require("./conditions/machine-load");
const serverLoadCondition = require("./conditions/server-load");
const responseTimeCondition = require("./conditions/response-time");

const ElectrodeAutoSSR = {};

ElectrodeAutoSSR.register = function (server, options, next) {
  const _opts = Object.assign({
    disabled: {}
  }, options);

  if (!_opts.disabled.serverLoadCondition) {

    const serverLoadHandler = serverLoadCondition(_opts);
    server.ext("onPreHandler", serverLoadHandler);

  }

  if (!_opts.disabled.machineLoadCondition) {

    const machineLoadHandler = machineLoadCondition(_opts);
    server.ext("onPreHandler", machineLoadHandler);

  }

  if (!_opts.disabled.responseTimeCondition) {

    if (server.app.longResponses === undefined) {
      server.app.longResponses = 0;
    }

    const responseTimeDetector = responseTimeCondition.detector(_opts);
    server.on("response", responseTimeDetector);

    const responseTimeActor = responseTimeCondition.actor;
    server.ext("onPreHandler", responseTimeActor);

  }

  next();

};

ElectrodeAutoSSR.register.attributes = {
  name: "ElectrodeAutoSSR",
  version: "1.0.0"
};

module.exports = ElectrodeAutoSSR;
