"use strict";

const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");

const HTTP_ERROR_500 = 500;
const HTTP_REDIRECT = 302;

const registerRoutes = (app, options, next) => {
  ReactWebapp.setupOptions(options)
    .then((registerOptions) => {
      _.each(registerOptions.paths, (v, path) => {
        assert(v.content, `You must define content for the webapp plugin path ${path}`);

        const routeHandler = ReactWebapp.makeRouteHandler(
          registerOptions, ReactWebapp.resolveContent(v.content));

        app.get(path, (request, response) => {
          const handleStatus = (data) => {
            const status = data.status;
            if (status === HTTP_REDIRECT) {
              response.redirect(data.path);
            } else {
              response.send({message: "error"}).code(status);
            }
          };

          return routeHandler({mode: request.query.__mode || "", request})
            .then((data) => {
              return data.status ? handleStatus(data) : response.send(data);
            })
            .catch((err) => {
              response.send(err.html).code(err.status || HTTP_ERROR_500);
            });
        });
      });
    })
    .then(() => next())
    .catch(next);
};

module.exports = registerRoutes;
