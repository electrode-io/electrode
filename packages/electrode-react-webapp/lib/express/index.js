"use strict";

/* eslint-disable no-magic-numbers */

const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");
const HttpStatus = require("http-status-codes");

const handleRoute = (request, response, handler) => {
  return handler({ mode: request.query.__mode || "", request })
    .then(data => {
      const status = data.status;

      // Status codes where we might want to keep custom html
      const displayHtmlStatuses = [
        HttpStatus.NOT_FOUND,
        HttpStatus.GONE,
        HttpStatus.SERVICE_UNAVAILABLE
      ];

      // Status codes where we want to redirect the user
      const redirectStatuses = [
        HttpStatus.MOVED_PERMANENTLY,
        HttpStatus.MOVED_TEMPORARILY,
        HttpStatus.PERMANENT_REDIRECT,
        HttpStatus.TEMPORARY_REDIRECT
      ];

      if (status === undefined) {
        response.send(data);
      } else if (redirectStatuses.find(redirectStatus => redirectStatus === status)) {
        response.redirect(status, data.path);
      } else if (displayHtmlStatuses.find(displayHtmlStatus => displayHtmlStatus === status)) {
        response.status(status)
          .send(data.html !== undefined ? data.html : data);
      } else if (status >= 200 && status < 300) {
        response.send(data.html !== undefined ? data.html : data);
      } else {
        response.status(status).send(data);
      }
    })
    .catch(err => response.status(err.status).send(err.message));
};

const registerRoutes = (app, options, next = () => {}) => {
  const registerOptions = ReactWebapp.setupOptions(options);

  _.each(registerOptions.paths, (v, path) => {
    assert(v.content, `You must define content for the webapp plugin path ${path}`);

    const resolveContent = () => {
      if (registerOptions.serverSideRendering !== false) {
        assert(
          v.content !== undefined,
          `You must define content for the webapp plugin path ${path}`
        );
        return ReactWebapp.resolveContent(v.content);
      }
      return { status: 200, html: "" };
    };

    const routeOptions = _.defaults({ htmlFile: v.htmlFile }, registerOptions);

    const routeHandler = ReactWebapp.makeRouteHandler(routeOptions, resolveContent());

    /*eslint max-nested-callbacks: [0, 4]*/
    let methods = v.method || ["GET"];
    if (!Array.isArray(methods)) {
      methods = [methods];
    }
    _.each(methods, method => {
      if (method === "*") {
        method = "ALL";
      }
      app[method.toLowerCase()](path, (req, res) => handleRoute(req, res, routeHandler));
    });
  });

  // resolve promise
  next();
};

module.exports = registerRoutes;
