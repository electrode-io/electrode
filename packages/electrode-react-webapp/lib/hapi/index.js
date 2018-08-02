"use strict";

/* eslint-disable no-magic-numbers, max-params, max-statements */

const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");
const HttpStatus = require("../http-status");
const { htmlifyError } = require("../utils");

const DefaultHandleRoute = (request, reply, handler, content, routeOptions) => {
  return handler({
    content,
    mode: request.query.__mode || "",
    template: request.indexPageTemplate,
    request
  })
    .then(context => {
      const data = context.result;

      if (data instanceof Error) {
        throw data;
      }

      let respond;
      let status = data.status;

      if (status === undefined) {
        status = 200;
        respond = reply(data);
      } else if (HttpStatus.redirect[status]) {
        respond = reply.redirect(data.path);
        return respond;
      } else if (HttpStatus.displayHtml[status] || (status >= 200 && status < 300)) {
        respond = reply(data.html !== undefined ? data.html : data);
      } else {
        respond = reply(data);
      }

      const response = context.user && context.user.response;

      if (response) {
        Object.assign(respond.headers, response.headers);
      }

      return respond.code(status);
    })
    .catch(err => {
      reply(htmlifyError(err, routeOptions.replyErrorStack)).code(err.status || 500);
    });
};

const registerRoutes = (server, options) => {
  const registerOptions = ReactWebapp.setupOptions(options);
  _.each(registerOptions.paths, (pathData, path) => {
    const resolveContent = () => {
      if (registerOptions.serverSideRendering !== false) {
        assert(
          pathData.content !== undefined,
          `You must define content for the webapp plugin path ${path}`
        );
        return ReactWebapp.resolveContent(pathData.content);
      }
      return { content: { status: 200, html: "" } };
    };

    const routeOptions = ReactWebapp.setupPathOptions(registerOptions, path);
    const routeHandler = ReactWebapp.makeRouteHandler(routeOptions);
    const handleRoute = options.handleRoute || DefaultHandleRoute;
    let content;

    server.route({
      method: pathData.method || "GET",
      path,
      config: pathData.config || {},
      handler: (req, reply) => {
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

        handleRoute(req, reply, routeHandler, content.content, routeOptions);
      }
    });
  });
};

const registerRoutesPlugin = (server, options, next) => {
  try {
    registerRoutes(server, options);
    return next();
  } catch (err) {
    return next(err);
  }
};

registerRoutesPlugin.attributes = {
  pkg: {
    name: "webapp",
    version: "1.0.0"
  }
};

// registerRoutesPlugin.registerRoutes = registerRoutes;

module.exports = {
  register: registerRoutesPlugin,
  registerRoutes
};
