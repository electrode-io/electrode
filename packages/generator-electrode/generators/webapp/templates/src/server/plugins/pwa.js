"use strict";

/*eslint-env es6*/
const plugin = {};

plugin.register = function(server, options, next) {
  server.route({
    method: "GET",
    path: "/sw.js",
    handler: {
      file: "dist/sw.js"
    }
  });
  next();
};

plugin.register.attributes = {
  name: "PWAPlugin",
  version: "0.0.1"
};

module.exports = plugin;
