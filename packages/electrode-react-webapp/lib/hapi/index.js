"use strict";

const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");

const HTTP_ERROR_500 = 500;
const HTTP_REDIRECT = 302;

const registerRoutes = (server, options, next) => {
  ReactWebapp.setupOptions(options)
    .then(registerOptions => {
      _.each(registerOptions.paths, (v, path) => {
        const resolveContent = () => {
          if (registerOptions.serverSideRendering !== false) {
            assert(
              v.content !== undefined,
              `You must define content for the webapp plugin path ${path}`
            );
            return ReactWebapp.resolveContent(v.content);
          }
          return "";
        };

        const routeOptions = _.defaults({ htmlFile: v.htmlFile }, registerOptions);

        const routeHandler = ReactWebapp.makeRouteHandler(routeOptions, resolveContent());

        server.route({
          method: v.method || "GET",
          path,
          config: v.config || {},
          handler: (request, reply) => {
            const handleStatus = data => {
              const status = data.status;
              if (status === HTTP_REDIRECT) {
                reply.redirect(data.path);
              } else {
                reply({ message: "error" }).code(status);
              }
            };

            routeHandler({ mode: request.query.__mode || "", request })
              .then(data => {
                return data.status ? handleStatus(data) : reply(data);
              })
              .catch(err => {
                reply(err.message).code(err.status || HTTP_ERROR_500);
              });
          }
        });
      });
    })
    .then(() => next())
    .catch(next);
};

registerRoutes.attributes = {
  pkg: {
    name: "webapp",
    version: "1.0.0"
  }
};

module.exports = registerRoutes;
