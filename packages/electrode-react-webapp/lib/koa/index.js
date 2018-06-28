"use strict";

/* eslint-disable generator-star-spacing, no-invalid-this */
/* eslint-disable no-magic-numbers, prefer-arrow-callback */

const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");
const HttpStatus = require("../http-status");

function DefaultHandleRoute(handler, content) {
  const request = this.request;
  const respond = (status, data) => {
    this.status = status;
    this.body = data;
  };

  return handler({ content, mode: request.query.__mode || "", request })
    .then(data => {
      const status = data.status;

      if (status === undefined) {
        respond(200, data);
      } else if (HttpStatus.redirect[status]) {
        this.redirect(data.path);
      } else if (HttpStatus.displayHtml[status]) {
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
      return { content: { status: 200, html: "" } };
    };

    const routeOptions = _.defaults({ htmlFile: v.htmlFile }, registerOptions);
    const routeHandler = ReactWebapp.makeRouteHandler(routeOptions);
    const handleRoute = options.handleRoute || DefaultHandleRoute;
    let content;

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
        if (!content) content = resolveContent();
        return handleRoute.call(this, routeHandler, content.content);
      }); //end get
    });
  });
};

module.exports = registerRoutes;
