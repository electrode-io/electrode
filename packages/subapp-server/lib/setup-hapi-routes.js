"use strict";

// Copy from electrode-react-webapp for now

/* eslint-disable max-statements, complexity, global-require, no-magic-numbers, no-console */

const _ = require("lodash");
const Fs = require("fs");
const Path = require("path");
const util = require("util");
const Boom = require("@hapi/boom");
const HttpStatus = require("./http-status");
const readFile = util.promisify(Fs.readFile);
const xaa = require("xaa");
const subAppUtil = require("subapp-util");
const registerRoutes = require("./register-routes");

const routesFromFile = require("./routes-from-file");
const routesFromDir = require("./routes-from-dir");
const { errorResponse, getSrcDir } = require("./utils");

async function handleFavIcon(server, options) {
  //
  // favicon handling, turn off by setting options.favicon to false
  //
  if (options.favicon === false) {
    return;
  }

  // look in CWD/static
  const iconFile = Path.resolve(options.favicon || "static/favicon.ico");
  const icon = await xaa.try(() => readFile(iconFile));

  server.route({
    method: "get",
    path: "/favicon.ico",
    async handler() {
      if (icon) return icon;
      else return Boom.notFound();
    }
  });
}

async function registerRoutesFromFile({ server, srcDir, routes, topOpts }) {
  const subApps = await subAppUtil.scanSubAppsFromDir(srcDir);
  const subAppsByPath = subAppUtil.getSubAppByPathMap(subApps);

  // setup for initialize callback
  server.ext("onPreAuth", async (request, h) => {
    const rte = routes[request.route.path];
    if (rte && rte.initialize) {
      const x = await rte.initialize(request, h);
      if (x) return x;
    }
    return h.continue;
  });

  // register routes

  for (const path in routes) {
    const route = routes[path];
    const routeOptions = Object.assign({}, topOpts, route);

    routeOptions.uiConfig = _.get(server, "settings.app.config.ui", {});

    // setup the template for rendering the route
    const routeRenderer = routesFromFile.setupRouteTemplate({
      subAppsByPath,
      srcDir,
      routeOptions
    });

    const useStream = routeOptions.useStream !== false;

    const handler = async (request, h) => {
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
          return h.response(data).type("text/html; charset=UTF-8").code(200);
        } else if (HttpStatus.redirect[status]) {
          return h.redirect(data.path).code(status);
        } else if (HttpStatus.displayHtml[status]) {
          return h.response(data.html !== undefined ? data.html : data).code(status);
        } else if (status >= 200 && status < 300) {
          return data.html !== undefined ? data.html : data;
        } else {
          return h.response(data).code(status);
        }
      } catch (err) {
        return errorResponse({
          routeName: path,
          request,
          h,
          err
        });
      }
    };

    const defaultMethods = [].concat(route.methods || "get");
    const paths = _.uniq([path].concat(route.paths).filter(x => x)).map(x => {
      if (typeof x === "string") {
        return { [x]: defaultMethods };
      }
      return x;
    });

    paths.forEach(pathObj => {
      _.each(pathObj, (method, xpath) => {
        server.route(
          Object.assign({}, route.settings, {
            path: xpath,
            method,
            handler
          })
        );
      });
    });
  }
}

async function setupRoutesFromFile(srcDir, server, pluginOpts) {
  const { routes, topOpts } = routesFromFile.searchRoutes(srcDir, pluginOpts);

  await handleFavIcon(server, topOpts);

  // invoke setup callback
  for (const path in routes) {
    if (routes[path].setup) {
      await routes[path].setup(server);
    }
  }

  await registerRoutesFromFile({
    server,
    routes,
    topOpts,
    srcDir
  });
}

async function setupRoutesFromDir(server, fromDir) {
  const { routes, topOpts } = fromDir;

  topOpts.routes = _.merge({}, routes, topOpts.routes);

  const routesWithSetup = routes.filter(x => x.route.setup);

  for (const route of routesWithSetup) {
    await route.route.setup(server);
  }

  await handleFavIcon(server, topOpts);

  // register onRequest
  const routesWithInit = routes.filter(x => x.route.initialize);
  if (routesWithInit.length > 0) {
    server.ext("onPreAuth", async (request, h) => {
      const rte = routes[request.route.path];
      if (rte && rte.initialize) {
        const x = await rte.initialize(request, h);
        if (x) return x;
      }
      return h.continue;
    });
  }

  // in case needed, add full protocol/host/port to dev bundle base URL
  topOpts.devBundleBase = subAppUtil.formUrl({
    ..._.pick(topOpts.devServer, ["protocol", "host", "port"]),
    path: topOpts.devBundleBase
  });

  registerRoutes({ routes, topOpts, server });
}

async function setupSubAppHapiRoutes(server, pluginOpts) {
  const srcDir = getSrcDir(pluginOpts);

  const fromDir = await routesFromDir.searchRoutes(srcDir, pluginOpts);
  if (fromDir) {
    return await setupRoutesFromDir(server, fromDir);
  }

  // no directory based routes, then they must in a JS file
  return await xaa.wrap(() => setupRoutesFromFile(srcDir, server, pluginOpts));
}

module.exports = {
  setupRoutesFromFile,
  setupSubAppHapiRoutes
};
