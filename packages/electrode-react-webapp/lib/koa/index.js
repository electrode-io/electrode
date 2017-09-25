"use strict";

/* eslint-disable generator-star-spacing, no-invalid-this */
/* eslint-disable no-magic-numbers, prefer-arrow-callback */

const _ = require("lodash");
const assert = require("assert");
const HttpStatus = require("http-status-codes");
const ReactWebapp = require("../react-webapp");

function handleRoute(handler) {
  const request = this.request;
  const respond = (status, data) => {
    this.status = status;
    this.body = data;
  };

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
        respond(200, data);
      } else if (redirectStatuses.find(redirectStatus => redirectStatus === status)) {
        this.redirect(data.path);
      } else if (displayHtmlStatuses.find(displayHtmlStatus => displayHtmlStatus === status)) {
        respond(status, data.html !== undefined ? data.html : data);
      } else if (status >= 200 && status < 300) {
        respond(status, data.html !== undefined ? data.html : data);
      } else {
        respond(status, data);
      }
    })
    .catch(err => {
      respond(err.status, err.message);
    });
}

const registerRoutes = (router, options) => {
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

    let methods = v.method || ["GET"];
    if (!Array.isArray(methods)) {
      methods = [methods];
    }

    _.each(methods, method => {
      if (method === "*") {
        method = "ALL";
      }

      /*eslint max-nested-callbacks: [0, 4]*/
      router(method.toLowerCase(), path, function() {
        return handleRoute.call(this, routeHandler);
      }); //end get
    });
  });
};

module.exports = registerRoutes;
