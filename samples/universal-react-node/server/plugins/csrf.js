"use strict";
/*eslint-env es6*/
const plugin = {};

/*
  Sample endpoints to demonstrate CSRF protection via the electrode-csrf-jwt module.
  Note the endpoints require no special configuration for protection to be enabled.
*/
plugin.register = function (server, options, next) {
  /* a demo GET endpoint which will return a CSRF cookie + header */
  server.route({
    method: "GET",
    path: "/1",
    handler: (req, reply) => {
      reply("valid");
    }
  });
  /* a demo POST endpoint which will require a CSRF cookie + header */
  server.route({
    method: "POST",
    path: "/2",
    handler: (req, reply) => {
      reply("valid");
    }
  });
  next();
};

plugin.register.attributes = {
  name: "CSRFPlugin",
  version: "0.0.1"
};

module.exports = plugin;
