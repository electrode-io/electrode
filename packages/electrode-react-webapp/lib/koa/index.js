"use strict";

/* eslint-disable generator-star-spacing */
const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");
const koaRouter = require("koa-router")();

const HTTP_REDIRECT = 302;

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

            const handleStatus = data => {
              const status = data.status;
              if (status === HTTP_REDIRECT) {
                this.redirect(data.path); //eslint-disable-line
              } else {
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
                respond(err.html); //.code(err.status || HTTP_ERROR_500);
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
