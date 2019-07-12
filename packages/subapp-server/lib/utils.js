"use strict";

// Copy from electrode-react-webapp for now

/* eslint-disable max-statements, complexity, global-require, no-magic-numbers, no-console */

const _ = require("lodash");
const Fs = require("fs");
const Path = require("path");
const assert = require("assert");
const Url = require("url");
const util = require("util");
const optionalRequire = require("optional-require")(require);
const scanDir = require("filter-scan-dir");
const Boom = require("boom");
const HttpStatus = require("./http-status");
const readFile = util.promisify(Fs.readFile);
const { isHapi17 } = require("electrode-hapi-compat");
const xaa = require("xaa");
const { ReactWebapp } = require("electrode-react-webapp");

/**
 * Tries to import bundle chunk selector function if the corresponding option is set in the
 * webapp plugin configuration. The function takes a `request` object as an argument and
 * returns the chunk name.
 *
 * @param {Object} options - webapp plugin configuration options
 * @return {Function} function that selects the bundle based on the request object
 */
function resolveChunkSelector(options) {
  if (options.bundleChunkSelector) {
    return require(Path.resolve(options.bundleChunkSelector)); // eslint-disable-line
  }

  return () => ({
    css: "main",
    js: "main"
  });
}

/**
 * Load stats.json which is created during build.
 * Attempt to load the stats.json file which contains a manifest of
 * The file contains bundle files which are to be loaded on the client side.
 *
 * @param {string} statsPath - path of stats.json
 * @returns {Promise.<Object>} an object containing an array of file names
 */
function loadAssetsFromStats(statsPath) {
  let stats;
  try {
    stats = JSON.parse(Fs.readFileSync(Path.resolve(statsPath)).toString());
  } catch (err) {
    return {};
  }
  const assets = {};
  const manifestAsset = _.find(stats.assets, asset => {
    return asset.name.endsWith("manifest.json");
  });
  const jsAssets = stats.assets.filter(asset => {
    return asset.name.endsWith(".js");
  });
  const cssAssets = stats.assets.filter(asset => {
    return asset.name.endsWith(".css");
  });

  if (manifestAsset) {
    assets.manifest = manifestAsset.name;
  }

  assets.js = jsAssets;
  assets.css = cssAssets;
  assets.byChunkName = stats.assetsByChunkName;

  return assets;
}

function getIconStats(iconStatsPath) {
  let iconStats;
  try {
    iconStats = Fs.readFileSync(Path.resolve(iconStatsPath)).toString();
    iconStats = JSON.parse(iconStats);
  } catch (err) {
    return "";
  }
  if (iconStats && iconStats.html) {
    return iconStats.html.join("");
  }
  return iconStats;
}

function getCriticalCSS(path) {
  const criticalCSSPath = Path.resolve(process.cwd(), path || "");

  try {
    const criticalCSS = Fs.readFileSync(criticalCSSPath).toString();
    return criticalCSS;
  } catch (err) {
    return "";
  }
}

/**
 * Resolves the path to the stats.json file containing our
 * asset list. In dev the stats.json file is written to a
 * build artifacts directory, while in produciton its contained
 * within the dist/server folder
 * @param  {string} statsFilePath      path to stats.json
 * @param  {string} buildArtifactsPath path to stats.json in dev
 * @return {string}                    current active path
 */
function getStatsPath(statsFilePath, buildArtifactsPath) {
  return process.env.WEBPACK_DEV === "true"
    ? Path.resolve(buildArtifactsPath, "stats.json")
    : statsFilePath;
}

const resolvePath = path => (!Path.isAbsolute(path) ? Path.resolve(path) : path);

const updateFullTemplate = (baseDir, options) => {
  const templateOpt = ["templateFile", "htmlFile"].find(x => options[x]);

  if (templateOpt) {
    options[templateOpt] = Path.resolve(baseDir, options[templateOpt]);
  }

  return templateOpt;
};

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

  updateFullTemplate(routesDir, options);

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
            return h.continue;
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
      _.pick(route, ["pageTitle", "bundleChunkSelector", "htmlFile", "templateFile"])
    );

    updateFullTemplate(r.dir, routeOptions);

    assert(
      routeOptions.templateFile || routeOptions.htmlFile,
      `subapp-server: route ${r.name} must define templateFile or htmlFile`
    );

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
            const context = await routeHandler({
              content: { html: "", status: 200, useStream: true },
              mode: "",
              request
            });
            const data = context.result;
            const status = data.status;

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
            content: { html: "", status: 200, useStream: true },
            mode: "",
            request
          })
            .then(context => {
              const data = context.result;
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

module.exports = {
  resolveChunkSelector,
  loadAssetsFromStats,
  getIconStats,
  getCriticalCSS,
  getStatsPath,
  resolvePath,
  setupSubAppHapiRoutes,
  legacyPlugin
};
