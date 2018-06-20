"use strict";

/* eslint-disable no-magic-numbers, max-params */

const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");
const HttpStatus = require("../http-status");

const DefaultHandleRoute = (request, response, handler, content) => {
  return handler({ content, mode: request.query.__mode || "", request })
    .then(data => {
      const status = data.status;

      if (status === undefined) {
        response.send(data);
      } else if (HttpStatus.redirect[status]) {
        response.redirect(status, data.path);
      } else if (HttpStatus.displayHtml[status]) {
        response.status(status).send(data.html !== undefined ? data.html : data);
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
    const routeHandler = ReactWebapp.makeRouteHandler(routeOptions);
    const handleRoute = options.handleRoute || DefaultHandleRoute;
    let content;

    /*eslint max-nested-callbacks: [0, 4]*/
    let methods = v.method || ["GET"];
    if (!Array.isArray(methods)) {
      methods = [methods];
    }
    _.each(methods, method => {
      if (method === "*") {
        method = "ALL";
      }
      app[method.toLowerCase()](path, (req, res) =>
        handleRoute(req, res, routeHandler, content || (content = resolveContent()))
      );
    });
  });

  // resolve promise
  next();
};

module.exports = registerRoutes;
