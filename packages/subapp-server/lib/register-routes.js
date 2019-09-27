"use strict";

/* eslint-disable max-statements, complexity, global-require, no-magic-numbers, no-console */

const assert = require("assert");
const _ = require("lodash");
const HttpStatus = require("./http-status");
const Boom = require("@hapi/boom");
const { ReactWebapp } = require("electrode-react-webapp");
const { resolveChunkSelector, updateFullTemplate } = require("./utils");

module.exports = function registerRoutes({ routes, topOpts, assets, server }) {
  // register routes
  routes.forEach(r => {
    const { route } = r;

    const routeOptions = Object.assign(
      {},
      topOpts,
      _.pick(route, ["pageTitle", "bundleChunkSelector", "templateFile"])
    );

    assert(routeOptions.templateFile, `subapp-server: route ${r.name} must define templateFile`);
    updateFullTemplate(r.dir, routeOptions);

    const chunkSelector = resolveChunkSelector(routeOptions);

    routeOptions.__internals = {
      assets,
      chunkSelector
    };

    const routeHandler = ReactWebapp.makeRouteHandler(routeOptions);

    const handler = async (request, h) => {
      try {
        const context = await routeHandler({
          content: { html: "", status: 200, useStream: true },
          mode: "",
          request
        });
        const data = context.result;
        const status = data.status;

        if (status === undefined) {
          return h
            .response(data)
            .type("text/html; charset=UTF-8")
            .code(200);
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
          return err.stack;
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
