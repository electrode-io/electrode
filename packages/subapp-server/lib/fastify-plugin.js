"use strict";

/* eslint-disable no-magic-numbers, max-statements */

const Path = require("path");
const assert = require("assert");
const _ = require("lodash");
const xaa = require("xaa");
const HttpStatus = require("./http-status");
const subAppUtil = require("subapp-util");
const HttpStatusCodes = require("http-status-codes");
const Fs = require("fs");
const util = require("util");
const readFile = util.promisify(Fs.readFile);
const {
  utils: { resolveChunkSelector }
} = require("@xarc/index-page");

const {
  getSrcDir,
  makeErrorStackResponse,
  checkSSRMetricsReporting,
  updateFullTemplate
} = require("./utils");

const routesFromFile = require("./routes-from-file");
const routesFromDir = require("./routes-from-dir");
const templateRouting = require("./template-routing");

function makeRouteHandler({ path, routeRenderer, routeOptions }) {
  const useStream = routeOptions.useStream !== false;

  return async (request, reply) => {
    try {
      const context = await routeRenderer({
        useStream,
        mode: "",
        request
      });

      const data = context.result;
      const status = data.status;

      if (data instanceof Error) {
        // rethrow to get default error behavior below with helpful errors in dev mode
        throw data;
      } else if (status === undefined) {
        reply.type("text/html; charset=UTF-8").code(HttpStatusCodes.OK);
        return reply.send(data);
      } else if (HttpStatus.redirect[status]) {
        return reply.redirect(status, data.path);
      } else if (HttpStatus.displayHtml[status] || (status >= HttpStatusCodes.OK && status < 300)) {
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
}

function getRoutePaths(route, path = null) {
  const defaultMethods = [].concat(route.methods || "get");
  const paths = _.uniq([path].concat(route.path, route.paths).filter(x => x)).map(x => {
    if (typeof x === "string") {
      return { [x]: defaultMethods };
    }
    return x;
  });

  return paths;
}

async function registerFastifyRoutesFromFile({ fastify, srcDir, routes, topOpts }) {
  checkSSRMetricsReporting(topOpts);

  const subApps = await subAppUtil.scanSubAppsFromDir(srcDir);
  const subAppsByPath = subAppUtil.getSubAppByPathMap(subApps);

  for (const path in routes) {
    const route = routes[path];

    const routeOptions = Object.assign({}, topOpts, route);

    routeOptions.uiConfig = _.get(fastify, "settings.app.config.ui", {});

    const routeRenderer = routesFromFile.setupRouteTemplate({
      subAppsByPath,
      srcDir,
      routeOptions
    });

    const handler = makeRouteHandler({ path, routeRenderer, routeOptions });
    if (routeOptions.auth) {
      const authStrategies = [].concat(routeOptions.auth).map(auth => fastify[auth]);
      const userPreHandler = _.get(route, "settings.preHandler");

      if (userPreHandler) {
        route.settings.preHandler = fastify.auth([...authStrategies, route.settings.preHandler], {
          run: "all"
        });
      } else {
        _.set(route, "settings.preHandler", fastify.auth(authStrategies));
      }
    }

    getRoutePaths(route, path).forEach(pathObj => {
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

async function registerFastifyRoutesFromDir({ fastify, topOpts, routes }) {
  checkSSRMetricsReporting(topOpts);

  routes.forEach(routeInfo => {
    const { route } = routeInfo;

    const routeOptions = Object.assign(
      {},
      topOpts,
      _.pick(route, ["pageTitle", "bundleChunkSelector", "templateFile", "selectTemplate"])
    );

    routeOptions.uiConfig = _.get(fastify, "settings.app.config.ui", {});

    assert(
      routeOptions.templateFile,
      `subapp-server: route ${routeInfo.name} must define templateFile`
    );
    updateFullTemplate(routeInfo.dir, routeOptions);

    const chunkSelector = resolveChunkSelector(routeOptions);

    routeOptions.__internals = { chunkSelector };

    const routeRenderer = templateRouting.makeRouteTemplateSelector(routeOptions);

    const paths = getRoutePaths(route);

    for (const pathObj of paths) {
      _.each(pathObj, (method, xpath) => {
        const routeHandler = makeRouteHandler({ path: xpath, routeRenderer, routeOptions });
        fastify.route({
          ...route.options,
          path: xpath,
          method: method.map(x => x.toUpperCase()),
          handler: routeHandler
        });
      });
    }
  });
}

async function setupRoutesFromDir(fastify, srcDir, fromDir) {
  const { routes, topOpts } = fromDir;

  topOpts.routes = _.merge({}, routes, topOpts.routes);

  const routesWithSetup = routes.filter(x => x.route.setup);

  for (const route of routesWithSetup) {
    await route.route.setup(fastify);
  }

  // TODO: invoke optional route intiailize hook

  // in case needed, add full protocol/host/port to dev bundle base URL
  topOpts.devBundleBase = subAppUtil.formUrl({
    ..._.pick(topOpts.devServer, ["protocol", "host", "port"]),
    path: topOpts.devBundleBase
  });

  await registerFastifyRoutesFromDir({ fastify, srcDir, topOpts, routes });
}

async function handleFavIcon(fastify, options) {
  //
  // favicon handling, turn off by setting options.favicon to false
  //
  if (options.favicon === false) {
    return;
  }

  // look in CWD/static
  let icon;

  const favIcons = [options.favicon, "static/favicon.ico", "static/favicon.png"].filter(_.identity);
  for (let i = 0; i < favIcons.length && !icon; i++) {
    const file = Path.resolve(favIcons[i]);
    icon = await xaa.try(() => readFile(file));
  }

  fastify.route({
    method: "GET",
    path: "/favicon.ico",
    handler(request, reply) {
      if (icon) {
        reply.type("image/x-icon").send(icon).status(HttpStatusCodes.OK);
      } else {
        reply.send("").status(HttpStatusCodes.NOT_FOUND);
      }
    }
  });
}

module.exports = {
  fastifyPlugin: async (fastify, pluginOpts) => {
    const srcDir = getSrcDir(pluginOpts);

    await handleFavIcon(fastify, pluginOpts);

    const fromDir = await routesFromDir.searchRoutes(srcDir, pluginOpts);
    if (fromDir) {
      return await setupRoutesFromDir(fastify, srcDir, fromDir);
    }

    const { routes, topOpts } = routesFromFile.searchRoutes(srcDir, pluginOpts);
    // invoke setup callback
    for (const path in routes) {
      if (routes[path].setup) {
        await routes[path].setup(fastify);
      }
    }

    return registerFastifyRoutesFromFile({ fastify, srcDir, routes, topOpts });
  }
};
