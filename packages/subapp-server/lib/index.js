"use strict";

/* eslint-disable max-statements, complexity, global-require, no-magic-numbers */
/* eslint-disable no-console */

const assert = require("assert");
const Fs = require("fs");
const Path = require("path");
const Url = require("url");
const util = require("util");
const optionalRequire = require("optional-require")(require);
const scanDir = require("filter-scan-dir");
const Boom = require("boom");
const _ = require("lodash");
const HttpStatus = require("./http-status");
const readFile = util.promisify(Fs.readFile);
const { universalHapiPlugin, isHapi17 } = require("electrode-hapi-compat");
const xaa = require("xaa");
const { ReactWebapp } = require("electrode-react-webapp");

const utils = require("./utils");

const { resolveChunkSelector, loadAssetsFromStats, getStatsPath } = utils;

async function setupSubAppHapiRoutes(server, options) {
  const srcDir = process.env.APP_SRC_DIR || (process.env.NODE_ENV === "production" ? "lib" : "src");
  const routesDir = Path.resolve(srcDir, "server-routes");

  //
  // look for routes under routesDir
  // - each dir inside is considered to be a route with name being the dir name
  //
  const dirs = await scanDir({ dir: routesDir, includeRoot: true, filter: f => f === "route.js" });

  //
  // load options for all routes from routesDir/options.js[x]
  //
  options = Object.assign(
    {
      pageTitle: "Untitled Electrode Web Application",
      //
      webpackDev: process.env.WEBPACK_DEV === "true",
      //
      devServer: {
        host: process.env.WEBPACK_DEV_HOST || process.env.WEBPACK_HOST || "127.0.0.1",
        port: process.env.WEBPACK_DEV_PORT || "2992",
        https: Boolean(process.env.WEBPACK_DEV_HTTPS)
      },
      //
      stats: "dist/server/stats.json",
      iconStats: "dist/server/iconstats.json",
      criticalCSS: "dist/js/critical.css",
      buildArtifacts: ".etmp",
      prodBundleBase: "/js/",
      cspNonceValue: undefined
    },
    options,
    optionalRequire(Path.join(routesDir, "options"), { default: {} })
  );

  if (options.htmlFile) {
    options.htmlFile = Path.resolve(routesDir, options.htmlFile);
  }

  //
  // Generate routes: load the route.js file for each route
  //
  const routes = dirs.map(x => {
    const name = Path.dirname(x.substring(routesDir.length + 1));
    const route = Object.assign({}, require(x));
    _.defaults(route, {
      path: name === "default" && "/",
      methods: options.methods || ["get"]
    });

    assert(route.path, `subapp-server: route ${name} must define a path`);

    return {
      name,
      dir: Path.dirname(x),
      route
    };
  });

  //
  // favicon handling, turn off by setting options.favicon to false
  //
  if (options.favicon !== false) {
    const icon = await xaa.try(() =>
      readFile(Path.resolve(routesDir, options.favicon || "favicon.png"))
    );

    server.route({
      method: "get",
      path: "/favicon.ico",
      handler: isHapi17()
        ? async () => {
            if (icon) return icon;
            else return Boom.notFound();
          }
        : (request, reply) => {
            if (icon) reply(icon);
            else reply(Boom.notFound());
          }
    });
  }

  const routesWithSetup = routes.filter(x => x.route.setup);
  if (routesWithSetup.length > 0) {
    routesWithSetup.forEach(x => x.route.setup(server, options));
  }

  // register onRequest
  const routesWithInit = routes.filter(x => x.route.initialize);
  if (routesWithInit.length > 0) {
    server.ext(
      "onRequest",
      isHapi17()
        ? async (request, h) => {
            try {
              routesWithInit.forEach(x => x.route.initialize(request));
            } catch (err) {
              //
            }
            h.continue();
          }
        : (request, reply) => {
            try {
              routesWithInit.forEach(x => x.route.initialize(request));
            } catch (err) {
              //
            }
            reply.continue();
          }
    );
  }

  const statsPath = getStatsPath(options.stats, options.buildArtifacts);
  const assets = loadAssetsFromStats(statsPath);
  options.devBundleBase = Url.format({
    protocol: options.devServer.https ? "https" : "http",
    hostname: options.devServer.host,
    port: options.devServer.port,
    pathname: "/js/"
  });

  // register routes
  routes.forEach(r => {
    const { route } = r;

    const routeOptions = Object.assign(
      {},
      options,
      _.pick(route, ["pageTitle", "bundleChunkSelector"])
    );

    if (route.htmlFile) {
      routeOptions.htmlFile = Path.resolve(r.dir, route.htmlFile);
    }

    assert(routeOptions.htmlFile, `subapp-server: route ${r.name} must define htmlFile`);

    const chunkSelector = resolveChunkSelector(routeOptions);

    routeOptions.__internals = {
      assets,
      chunkSelector
    };

    const routeHandler = ReactWebapp.makeRouteHandler(routeOptions);

    const handler = isHapi17()
      ? // Hapi 17 route handler
        async (request, h) => {
          try {
            const context = await routeHandler({ content: "", mode: "", request });
            const data = context.result;
            const status = context.status;

            if (status === undefined) {
              return data;
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
        }
      : // Hapi 16 route handler
        (request, reply) => {
          return routeHandler({
            content: "",
            mode: "",
            request
          })
            .then(data => {
              const status = data.status;

              if (status === undefined) {
                reply(data);
              } else if (HttpStatus.redirect[status]) {
                reply.redirect(data.path);
              } else if (HttpStatus.displayHtml[status]) {
                reply(data.html !== undefined ? data.html : data).code(status);
              } else if (status >= 200 && status < 300) {
                reply(data.html !== undefined ? data.html : data);
              } else {
                reply(data).code(status);
              }
            })
            .catch(err => {
              if (process.env.NODE_ENV !== "production") {
                console.error(`Route ${r.name} failed:`, err);
                reply(err.stack);
              } else {
                reply(Boom.internal());
              }
            });
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
}

function legacyPlugin(server, options, next) {
  try {
    setupSubAppHapiRoutes(server, options).then(() => next());
  } catch (err) {
    next(err); // eslint-disable-line
  }
}

module.exports = universalHapiPlugin(
  {
    hapi16: legacyPlugin,
    hapi17: setupSubAppHapiRoutes
  },
  {
    name: "subapp-server",
    version: "1.0.0"
  }
);
