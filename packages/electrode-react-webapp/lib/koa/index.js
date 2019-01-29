"use strict";

/* eslint-disable generator-star-spacing, no-invalid-this */
/* eslint-disable no-magic-numbers, prefer-arrow-callback */

const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");
const HttpStatus = require("../http-status");
const { responseForError, responseForBadStatus } = require("../utils");

const getDataHtml = data => (data.html !== undefined ? data.html : data);

const DefaultHandleRoute = (request, response, handler, content, routeOptions) => {
  return handler({ content, mode: (request.query && request.query.__mode) || "", request })
    .then(context => {
      const data = context.result;
      if (data instanceof Error) {
        throw data;
      }

      const status = data.status;

      if (status === undefined) {
        response.status = 200;
        response.body = data;
      } else if (HttpStatus.redirect[status]) {
        response.redirect(data.path);
        response.status = status;
      } else if (status >= 200 && status < 300) {
        response.body = getDataHtml(data);
      } else if (routeOptions.responseForBadStatus) {
        const output = routeOptions.responseForBadStatus(request, routeOptions, data);
        response.status = output.status;
        response.body = output.html;
      } else {
        response.status = status;
        response.body = getDataHtml(data);
      }
      return response;
    })
    .catch(err => {
      const output = routeOptions.responseForError(request, routeOptions, err);
      response.status = output.status;
      response.body = output.html;
    });
};

const registerRoutes = (router, options, next = () => {}) => {
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
      router[method.toLowerCase()](path, async (ctx, next) => {
        if (!content) content = resolveContent();
        await handleRoute(ctx.request, ctx.response, routeHandler, content.content, routeOptions);
        next();
      });
    });
  });
  next();
};

module.exports = registerRoutes;
