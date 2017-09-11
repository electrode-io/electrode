"use strict";

/* eslint-disable generator-star-spacing */
const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");
const HttpStatus = require("http-status-codes");
const koaRouter = require("koa-router")();

const registerRoutes = (app, options, next) => {
  ReactWebapp.setupOptions(options)
    .then(registerOptions => {
      _.each(registerOptions.paths, (v, path) => {
        assert(v.content, `You must define content for the webapp plugin path ${path}`);

        const routeHandler = ReactWebapp.makeRouteHandler(
          registerOptions,
          ReactWebapp.resolveContent(v.content)
        );

        let methods = v.method || ["GET"];
        if (!Array.isArray(methods)) {
          methods = [methods];
        }
        _.each(methods, method => {
          if (method === "*") {
            method = "ALL";
          }
          /*eslint max-nested-callbacks: [0, 4]*/
          koaRouter[method.toLowerCase()](path, function*() {
            const request = this.request; //eslint-disable-line
            const respond = data => {
              this.body = data; //eslint-disable-line
            };

            // Respond with explicitly set status
            const respondWithStatus = (data) => {
              this.status = data.status; //eslint-disable-line
              this.body = data.content; //eslint-disable-line
            };

            const handleStatus = data => {
              const status = data.status;

              // All statuses where we just want to send the status to the client
              const sendBodyStatuses = [
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
              if (status === HttpStatus.OK) {
                respond(data.content);
              } else if (sendBodyStatuses.find(sendBodyStatus => sendBodyStatus === status)) {
                respondWithStatus(data);
              } else if (redirectStatuses.find(redirectStatus => redirectStatus === status)) {
                this.redirect(data.path); //eslint-disable-line
              } else if (errorStatuses.find(errorStatus => errorStatus === status)) {
                respondWithStatus({
                  status: status,
                  content: HttpStatus.getStatusText(status)
                });
              } else {
                // Default Error Handling
                respond({ message: "error" });
              }
            };

            yield routeHandler({ mode: request.__mode || "", request })
              .then(data => {
                if (data.status) {
                  handleStatus(data);
                } else {
                  respond(data);
                }
              })
              .catch(err => {
                respond(err.html); //.code(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
              });
          }); //end get
        });
      });
      app.use(koaRouter.routes());
    })
    .then(() => next())
    .catch(next);
};

module.exports = registerRoutes;
