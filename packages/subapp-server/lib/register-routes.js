"use strict";

/* eslint-disable max-statements, complexity, global-require, no-magic-numbers, no-console */

const assert = require("assert");
const _ = require("lodash");
const HttpStatus = require("./http-status");
const Boom = require("@hapi/boom");
const { ReactWebapp } = require("electrode-react-webapp");
const { resolveChunkSelector, updateFullTemplate } = require("./utils");
const HttpStatusCodes = require("http-status-codes");

module.exports = function registerRoutes({ routes, topOpts, server }) {
  // register routes
  routes.forEach(r => {
    const { route } = r;

    const routeOptions = Object.assign(
      {},
      topOpts,
      _.pick(route, ["pageTitle", "bundleChunkSelector", "templateFile", "selectTemplate"])
    );

    assert(routeOptions.templateFile, `subapp-server: route ${r.name} must define templateFile`);
    updateFullTemplate(r.dir, routeOptions);

    const chunkSelector = resolveChunkSelector(routeOptions);

    routeOptions.__internals = { chunkSelector };

    const routeHandler = ReactWebapp.makeRouteHandler(routeOptions);

    const handler = async (request, h) => {
      try {
        const context = await routeHandler({
          content: { html: "", status: HttpStatusCodes.OK, useStream: false },
          mode: "",
          request
        });

        if (context._intercepted) {
          return context._intercepted.responseHandler(request, h, context);
        }

        const data = context.result;
        const status = data.status;

        if (data instanceof Error) {
          throw data;
        }

        if (status === undefined) {
          return h
            .response(data)
            .type("text/html; charset=UTF-8")
            .code(HttpStatusCodes.OK);
        } else if (HttpStatus.redirect[status]) {
          return h.redirect(data.path);
        } else if (HttpStatus.displayHtml[status]) {
          return h.response(data.html !== undefined ? data.html : data).code(status);
        } else if (status >= 200 && status < 300) {
          return data.html !== undefined ? data.html : data;
        } else {
          return h.response(data).code(status);
        }
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.error(`Route ${r.name} failed:`, err);
          return h
            .response(`<html><body><pre>${err.stack}</pre></body></html>`)
            .type("text/html; charset=UTF-8")
            .code(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        } else {
          return Boom.internal();
        }
      }
    };

    const defaultMethods = [].concat(route.methods);
    const paths = _.uniq([].concat(route.path, route.paths).filter(x => x)).map(x => {
      if (typeof x === "string") {
        return { [x]: defaultMethods };
      }
      return x;
    });

    paths.forEach(pathObj =>
      _.each(pathObj, (method, path) => {
        server.route(
          Object.assign({}, route.options, {
            path,
            method,
            handler: handler
          })
        );
      })
    );
  });
};
