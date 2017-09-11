"use strict";

const _ = require("lodash");
const assert = require("assert");
const HttpStatus = require("http-status-codes");
const ReactWebapp = require("../react-webapp");

const registerRoutes = (app, options, next) => {
  ReactWebapp.setupOptions(options)
    .then(registerOptions => {
      _.each(registerOptions.paths, (v, path) => {
        assert(v.content, `You must define content for the webapp plugin path ${path}`);

        const routeHandler = ReactWebapp.makeRouteHandler(
          registerOptions,
          ReactWebapp.resolveContent(v.content)
        );

        /*eslint max-nested-callbacks: [0, 4]*/
        let methods = v.method || ["GET"];
        if (!Array.isArray(methods)) {
          methods = [methods];
        }
        _.each(methods, method => {
          if (method === "*") {
            method = "ALL";
          }
          app[method.toLowerCase()](path, (request, response) => {
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
                return response.status(status).send(data.content);
              } else if (redirectStatuses.find(redirectStatus => redirectStatus === status)) {
                return response.redirect(status, data.path);
              } else if (errorStatuses.find(errorStatus => errorStatus === status)) {
                return response.status(status).send({ message: HttpStatus.getStatusText(status) });
              }

              // Default Error Handling
              return response.send({ message: "error" }).code(status);
            };

            return routeHandler({ mode: request.query.__mode || "", request })
              .then(data => {
                return data.status ? handleStatus(data) : response.send(data);
              })
              .catch(err => {
                response.send(err.html).code(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
              });
          });
        });
      });
    })
    .then(() => next())
    .catch(next);
};

module.exports = registerRoutes;
