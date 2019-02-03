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

      const status = data.status;

      if (status === undefined) {
        response.send(data);
      } else if (HttpStatus.redirect[status]) {
        response.redirect(status, data.path);
      } else if (status >= 200 && status < 300) {
        response.send(getDataHtml(data));
      } else if (routeOptions.responseForBadStatus) {
        const output = routeOptions.responseForBadStatus(request, routeOptions, data);
        response.status(output.status).send(output.html);
      } else {
        response.status(status).send(getDataHtml(data));
      }
    })
    .catch(err => {
      const output = routeOptions.responseForError(request, routeOptions, err);
      response.status(output.status).send(output.html);
    });
};

const registerRoutes = (app, options, next = () => {}) => {
  const registerOptions = ReactWebapp.setupOptions(options);

  _.each(registerOptions.paths, (v, path) => {
    const routeOptions = _.defaults({ htmlFile: v.htmlFile }, registerOptions);
    routeOptions.uiConfig = Object.assign({}, _.get(app, "config.ui", {}), routeOptions.uiConfig);
    const routeHandler = ReactWebapp.makeRouteHandler(routeOptions);
    const handleRoute = options.handleRoute || DefaultHandleRoute;

    _.defaults(routeOptions, { responseForError, responseForBadStatus });

    const contentResolver = ReactWebapp.getContentResolver(registerOptions, v.content, path);

    let methods = v.method || ["GET"];
    if (!Array.isArray(methods)) {
      methods = [methods];
    }

    _.each(methods, method => {
      if (method === "*") {
        method = "ALL";
      }
      app[method.toLowerCase()](path, (req, res) => {
        const content = contentResolver(req.app && req.app.webpackDev);
        handleRoute(req, res, routeHandler, content, routeOptions);
      });
    });
  });

  next();
};

module.exports = registerRoutes;
