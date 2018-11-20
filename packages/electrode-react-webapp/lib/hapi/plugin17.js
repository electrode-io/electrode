"use strict";

/* eslint-disable no-magic-numbers, max-params, max-statements, complexity */

const _ = require("lodash");
const assert = require("assert");
const ReactWebapp = require("../react-webapp");
const HttpStatus = require("../http-status");
const { responseForError, responseForBadStatus } = require("../utils");

const getDataHtml = data => (data.html !== undefined ? data.html : data);

const DefaultHandleRoute = (request, h, handler, content, routeOptions) => {
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
        respond = h.response(data);
      } else if (HttpStatus.redirect[status]) {
        respond = h.redirect(data.path);
        return respond;
      } else if (status >= 200 && status < 300) {
        respond = h.response(getDataHtml(data));
      } else if (routeOptions.responseForBadStatus) {
        const output = routeOptions.responseForBadStatus(request, routeOptions, data);
        status = output.status;
        respond = h.response(output.html);
      } else {
        // should not reach here w/o html because user returned content
        // would have to return a literal string that has no `.status`
        // and html being undefined to be able to skip all the cases above
        respond = h.response(getDataHtml(data));
      }

      const response = context.user && context.user.response;

      if (response) {
        Object.assign(respond.headers, response.headers);
      }

      return respond.code(status);
    })
    .catch(err => {
      const output = routeOptions.responseForError(request, routeOptions, err);

      return h.response(output.html).code(output.status);
    });
};

const register = (server, options) => {
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
    const handleRoute = options.handleRoute || DefaultHandleRoute;
    _.defaults(routeOptions, { responseForError, responseForBadStatus });
    let content;

    server.route({
      method: pathData.method || "GET",
      path,
      config: pathData.config || {},
      handler: (req, h) => {
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

        return handleRoute(req, h, routeHandler, content.content, routeOptions);
      }
    });
  });
};

const pkg = require("../../package.json");

module.exports = {
  register,
  registerRoutes: register,
  pkg
};
