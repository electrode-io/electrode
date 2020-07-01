"use strict";

/* eslint-disable no-magic-numbers, max-statements */

const _ = require("lodash");
const HttpStatus = require("./http-status");
const subAppUtil = require("subapp-util");
const HttpStatusCodes = require("http-status-codes");

const { makeErrorStackResponse } = require("./utils");
const { getSrcDir, setupRouteRender, searchRoutesFromFile } = require("./setup-hapi-routes");

module.exports = {
  fastifyPlugin: async (fastify, pluginOpts) => {
    const srcDir = getSrcDir(pluginOpts);

    // TODO:
    // const fromDir = await searchRoutesDir(srcDir, pluginOpts);
    // if (fromDir) {
    //   //
    // }

    const { routes, topOpts } = searchRoutesFromFile(srcDir, pluginOpts);

    const reporting = _.get(topOpts, "reporting", {});
    if (!reporting.enable || !reporting.reporter) {
      // eslint-disable-next-line
      console.warn(`Warning: Metric reporting for ssr not enabled or no reporter specified.`);
    }

    const subApps = await subAppUtil.scanSubAppsFromDir(srcDir);
    const subAppsByPath = subAppUtil.getSubAppByPathMap(subApps);

    const makeRouteHandler = (path, route) => {
      const routeOptions = Object.assign({}, topOpts, route);

      const routeRenderer = setupRouteRender({ subAppsByPath, srcDir, routeOptions });
      const useStream = routeOptions.useStream !== false;

      return async (request, reply) => {
        try {
          const context = await routeRenderer({
            content: {
              html: "",
              status: 200,
              useStream
            },
            mode: "",
            request
          });

          const data =  context.result;
          const status = data.status;

          if (data instanceof Error) {
            // rethrow to get default error behavior below with helpful errors in dev mode
            throw data;
          } else if (status === undefined) {
            reply.type("text/html; charset=UTF-8").code(HttpStatusCodes.OK);
            return reply.send(data);
          } else if (HttpStatus.redirect[status]) {
            return reply.redirect(status, data.path);
          } else if (
            HttpStatus.displayHtml[status] ||
            (status >= HttpStatusCodes.OK && status < 300)
          ) {
            reply.type("text/html; charset=UTF-8").code(status);
            return reply.send(data.html !== undefined ? data.html : data);
          } else {
            reply.code(status);
            return reply.send(data);
          }
        } catch (err) {
          reply.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
          if (process.env.NODE_ENV !== "production") {
            const responseHtml = makeErrorStackResponse(path, err);
            reply.type("text/html; charset=UTF-8");
            return reply.send(responseHtml);
          } else {
            return reply.send("Internal Server Error");
          }
        }
      };
    };

    for (const path in routes) {
      const route = routes[path];

      const handler = makeRouteHandler(path, route);

      const defaultMethods = [].concat(route.methods || "get");
      const paths = _.uniq([path].concat(route.paths).filter(x => x)).map(x => {
        if (typeof x === "string") {
          return { [x]: defaultMethods };
        }
        return x;
      });

      paths.forEach(pathObj => {
        _.each(pathObj, (method, xpath) => {
          fastify.route({
            ...route.settings,
            path: xpath,
            method: method.map(x => x.toUpperCase()),
            handler
          });
        });
      });
    }
  }
};
