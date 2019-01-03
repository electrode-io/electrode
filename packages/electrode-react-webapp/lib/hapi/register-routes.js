"use strict";

/* eslint-disable no-magic-numbers, max-params, max-statements, complexity */

const _ = require("lodash");
const Path = require("path");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");
const { responseForError, responseForBadStatus } = require("../utils");

const registerRoutes = (server, options, defaultRouteHandler) => {
  const registerOptions = ReactWebapp.setupOptions(options);

  _.each(registerOptions.paths, (pathData, path) => {
    const resolveContent = () => {
      if (registerOptions.serverSideRendering !== false) {
        const x = ReactWebapp.resolveContent(pathData);
        assert(x, `You must define content for the webapp plugin path ${path}`);
        return x;
      }

      return {
        content: {
          status: 200,
          html: "<!-- SSR disabled by options.serverSideRendring -->"
        }
      };
    };

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
    let content;

    server.route({
      method: pathData.method || "GET",
      path: Path.posix.join(basePath, path),
      config: pathData.config || {},
      handler: (req, hOrReply) => {
        if (req.app.webpackDev) {
          const wpd = req.app.webpackDev;
          if (!wpd.valid) {
            content = ReactWebapp.resolveContent("<!-- Webpack still compiling -->");
          } else if (wpd.hasErrors) {
            content = ReactWebapp.resolveContent("<!-- Webpack compile has errors -->");
          } else if (!content || content.resolveTime < wpd.compileTime) {
            if (content && content.fullPath) {
              delete content.xrequire.cache[content.fullPath];
            }
            content = resolveContent();
          }
        } else if (!content) {
          content = resolveContent();
        }

        return handleRoute(req, hOrReply, routeHandler, content.content, routeOptions);
      }
    });
  });
};

module.exports = registerRoutes;
