"use strict";

const each = require("lodash/each");
const { universalHapiPlugin } = require("electrode-hapi-compat");

function setResponseStates(request, r) {
  // istanbul ignore else
  if (request.app.replyStates) {
    each(request.app.replyStates, (state, name) => {
      r.state(name, state.value, state.options);
    });
  }
}

function hapi17(server, options) {
  server.ext("onPreResponse", (request, h) => {
    setResponseStates(request, h);
    return h.continue;
  });
}

function hapi16(server, options, next) {
  server.ext("onPreResponse", (request, reply) => {
    setResponseStates(request, reply);
    return reply.continue();
  });

  next();
}

const pkg = require("./package.json");

module.exports = universalHapiPlugin(
  {
    hapi16,
    hapi17
  },
  pkg
);
