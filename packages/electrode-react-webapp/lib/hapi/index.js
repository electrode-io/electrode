"use strict";

const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");
const HttpStatus = require("http-status-codes");

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

              // All statuses where we just want to send the status to the client
              const sendBodyStatuses = [
                HttpStatus.OK,
                HttpStatus.NOT_FOUND,
                HttpStatus.GONE
              ];

              // All statuses where we want to redirect the client
              const redirectStatuses = [
                HttpStatus.MOVED_PERMANENTLY,
                HttpStatus.MOVED_TEMPORARILY,
                HttpStatus.TEMPORARY_REDIRECT
              ];

              // All the statuses where we want to send specific error messages
              const errorStatuses = [
                HttpStatus.BAD_REQUEST,
                HttpStatus.UNAUTHORIZED,
                HttpStatus.FORBIDDEN,
                HttpStatus.INTERNAL_SERVER_ERROR,
                HttpStatus.NOT_IMPLEMENTED,
                HttpStatus.SERVICE_UNAVAILABLE
              ];

              // Handle Different Status Codes differently
              if (sendBodyStatuses.find(sendBodyStatus => sendBodyStatus === status)) {
                return reply(data.content).code(status);
              } else if (redirectStatuses.find(redirectStatus => redirectStatus === status)) {
                return reply.redirect(data.path);
              } else if (errorStatuses.find(errorStatus => errorStatus === status)) {
                return reply({ message: HttpStatus.getStatusText(status) }).code(status);
              }

              // Default Error Handling
              return reply({ message: "error" }).code(status);
            };

            routeHandler({ mode: request.query.__mode || "", request })
              .then(data => {
                return data.status ? handleStatus(data) : reply(data);
              })
              .catch(err => {
                reply(err.message).code(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
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
