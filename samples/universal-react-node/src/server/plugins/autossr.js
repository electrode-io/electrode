"use strict"; //  eslint-disable-line

import machineLoadCondition from "../conditions/machine-load";
import serverLoadCondition from "../conditions/server-load";
import responseTimeCondition from "../conditions/response-time";

const ElectrodeSSRFlag = {};

ElectrodeSSRFlag.register = function(server, options, next) {
  const _opts = Object.assign(
    {
      disabled: {}
    },
    options
  );

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

ElectrodeSSRFlag.register.attributes = {
  name: "ElectrodeSSRFlag",
  version: "1.0.0"
};

module.exports = ElectrodeSSRFlag;
