"use strict";

/* eslint-disable generator-star-spacing, no-invalid-this */
/* eslint-disable no-magic-numbers, prefer-arrow-callback */

const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");
const HttpStatus = require("../http-status");
const { responseForError, responseForBadStatus } = require("../utils");

function DefaultHandleRoute(handler, content, routeOptions) {
  const request = this.request;
  const respond = (status, data) => {
    this.status = status;
    this.body = data;
  };

  return handler({ content, mode: request.query.__mode || "", request })
    .then(context => {
      const data = context.result;

      if (data instanceof Error) {
        throw data;
      }

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
        const output = routeOptions.responseForBadStatus(request, routeOptions, data);
        respond(output.status, output.html);
      }
    })
    .catch(err => {
      const output = routeOptions.responseForError(request, routeOptions, err);
      respond(output.status, output.html);
    });
}

const registerRoutes = (router, options) => {
  const registerOptions = ReactWebapp.setupOptions(options);

  _.each(registerOptions.paths, (v, path) => {
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
    _.defaults(routeOptions, { responseForError, responseForBadStatus });
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
        return handleRoute.call(this, routeHandler, content.content, routeOptions);
      }); //end get
    });
  });
};

module.exports = registerRoutes;
