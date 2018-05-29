"use strict";

/* eslint-disable no-magic-numbers */

const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");
const HttpStatus = require("../http-status");

const handleRoute = (request, reply, handler) => {
  return handler({ mode: request.query.__mode || "", request })
    .then(data => {
      const status = data.status;

      if (status === undefined) {
        reply(data);
      } else if (HttpStatus.redirect[status]) {
        reply.redirect(data.path);
      } else if (HttpStatus.displayHtml[status]) {
        reply(data.html !== undefined ? data.html : data).code(status);
      } else if (status >= 200 && status < 300) {
        reply(data.html !== undefined ? data.html : data);
      } else {
        reply(data).code(status);
      }
    })
    .catch(err => {
      reply(err.html).code(err.status);
    });
};

const registerRoutes = (server, options) => {
  const registerOptions = ReactWebapp.setupOptions(options);
  _.each(registerOptions.paths, (pathData, path) => {
    const resolveContent = () => {
      if (registerOptions.serverSideRendering !== false) {
        assert(
          pathData.content !== undefined,
          `You must define content for the webapp plugin path ${path}`
        );
        return ReactWebapp.resolveContent(pathData.content);
      }
      return { status: 200, html: "" };
    };

    const routeOptions = ReactWebapp.setupPathOptions(registerOptions, path);
    const routeHandler = ReactWebapp.makeRouteHandler(routeOptions, resolveContent());

    server.route({
      method: pathData.method || "GET",
      path,
      config: pathData.config || {},
      handler: (req, reply) => handleRoute(req, reply, routeHandler)
    });
  });
};

const registerRoutesPlugin = (server, options, next) => {
  try {
    registerRoutes(server, options);
    return next();
  } catch (err) {
    return next(err);
  }
};

registerRoutesPlugin.attributes = {
  pkg: {
    name: "webapp",
    version: "1.0.0"
  }
};

// registerRoutesPlugin.registerRoutes = registerRoutes;

module.exports = {
  register: registerRoutesPlugin,
  registerRoutes
};
