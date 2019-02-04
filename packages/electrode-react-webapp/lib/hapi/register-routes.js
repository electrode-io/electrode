"use strict";

/* eslint-disable no-magic-numbers, max-params, max-statements, complexity */

const _ = require("lodash");
const Path = require("path");
const ReactWebapp = require("../react-webapp");
const { responseForError, responseForBadStatus } = require("../utils");

const registerRoutes = (server, options, defaultRouteHandler) => {
  const registerOptions = ReactWebapp.setupOptions(options);

  _.each(registerOptions.paths, (pathData, path) => {
    const routeOptions = ReactWebapp.setupPathOptions(registerOptions, path);
    const routeHandler = ReactWebapp.makeRouteHandler(routeOptions);

    routeOptions.uiConfig = Object.assign(
      {},
      _.get(server, "settings.app.config.ui", {}),
      routeOptions.uiConfig
    );

    const basePath = routeOptions.uiConfig.basePath || "/";

    const handleRoute = options.handleRoute || defaultRouteHandler;
    _.defaults(routeOptions, { responseForError, responseForBadStatus });
    const contentResolver = ReactWebapp.getContentResolver(registerOptions, pathData, path);

    server.route({
      method: pathData.method || "GET",
      path: Path.posix.join(basePath, path),
      config: pathData.config || {},
      handler: (req, hOrReply) => {
        const content = contentResolver(req.app.webpackDev);
        return handleRoute(req, hOrReply, routeHandler, content, routeOptions);
      }
    });
  });
};

module.exports = registerRoutes;
