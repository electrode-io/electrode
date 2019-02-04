"use strict";

/* eslint-disable no-magic-numbers, max-params */

const _ = require("lodash");
const ReactWebapp = require("../react-webapp");
const HttpStatus = require("../http-status");
const { responseForError, responseForBadStatus } = require("../utils");

const getDataHtml = data => (data.html !== undefined ? data.html : data);

const DefaultHandleRoute = (request, response, handler, content, routeOptions) => {
  return handler({ content, mode: request.query.__mode || "", request })
    .then(context => {
      const data = context.result;
      if (data instanceof Error) {
        throw data;
      }

      if (data.status === undefined) {
        response.status = 200;
        response.body = data;
      } else if (HttpStatus.redirect[data.status]) {
        response.redirect(data.path);
        response.status = data.status;
      } else if (data.status >= 200 && data.status < 300) {
        response.body = getDataHtml(data);
      } else if (routeOptions.responseForBadStatus) {
        const output = routeOptions.responseForBadStatus(request, routeOptions, data);
        response.status = output.status;
        response.body = output.html;
      } else {
        response.status = data.status;
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
    const routeOptions = _.defaults({ htmlFile: v.htmlFile }, registerOptions);
    const routeHandler = ReactWebapp.makeRouteHandler(routeOptions);

    routeOptions.uiConfig = Object.assign(
      {},
      _.get(router, "config.ui", {}),
      routeOptions.uiConfig
    );

    const handleRoute = options.handleRoute || DefaultHandleRoute;
    _.defaults(routeOptions, { responseForError, responseForBadStatus });

    let methods = v.method || ["GET"];
    if (!Array.isArray(methods)) {
      methods = [methods];
    }

    const contentResolver = ReactWebapp.getContentResolver(registerOptions, v.content, path);

    _.each(methods, method => {
      if (method === "*") {
        method = "ALL";
      }

      router[method.toLowerCase()](path, async (ctx, next1) => {
        const content = contentResolver(ctx.webpackDev);
        await handleRoute(ctx.request, ctx.response, routeHandler, content, routeOptions);
        return next1();
      });
    });
  });

  next();
};

module.exports = registerRoutes;
