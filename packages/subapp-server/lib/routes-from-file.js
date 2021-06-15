"use strict";

/* eslint-disable max-statements, complexity, global-require, no-magic-numbers, no-console */

const _ = require("lodash");
const Path = require("path");
const optionalRequire = require("optional-require")(require);
const templateRouting = require("./template-routing");
const subAppUtil = require("subapp-util");

const {
  utils: { resolveChunkSelector }
} = require("@xarc/index-page");

const { getDefaultRouteOptions, updateFullTemplate } = require("./utils");

/**
 * hook to tap into subapp server before server starts.
 * Good place to register new api routes or any other enhancements of fastify server.
 * @param {object} server Underlying framework's server instance
 * @param {object} subAppsByPath map of absolute path and subapp's manifest
 * @returns {Void} Returns nothing.
 */
function _setupSubappServer(server, subAppsByPath) {
  const subAppServers = Object.keys(subAppsByPath).map((subAppPath) => {
    const subAppName = subAppsByPath[subAppPath].name;
    return subAppUtil.loadSubAppServerByName(subAppName, false);
  }).filter(x => x && x.setup);

  //invoke the setup method of subapp's server code
  if (subAppServers && subAppServers.length > 0) {
    for (const subAppServer of subAppServers) {
      subAppServer.setup(server);
    }
  }
}

function setupRouteTemplate({ server, subAppsByPath, srcDir, routeOptions }) {
  updateFullTemplate(routeOptions.dir, routeOptions);
  const chunkSelector = resolveChunkSelector(routeOptions);
  routeOptions.__internals = { chunkSelector };

  // load subapps for the route
  if (routeOptions.subApps) {
    routeOptions.__internals.subApps = [].concat(routeOptions.subApps).map(x => {
      let options;
      if (Array.isArray(x)) {
        options = x[1];
        x = x[0];
      }
      // absolute: use as path
      // module: resolve module path
      // else: assume dir under srcDir
      if (!x.startsWith(".") && !x.startsWith("/")) {
        const subAppPath = optionalRequire.resolve(x);
        if (subAppPath) {
          const { manifest, subAppOptions } = require(x);
          x = manifest ? Path.dirname(subAppPath) : x;
          options = options || subAppOptions;
        }
      }
      return {
        subapp: subAppsByPath[Path.isAbsolute(x) ? x : Path.resolve(srcDir, x)],
        options: options || {}
      };
    });

    // Call setup method if subappServer exposes the same
    _setupSubappServer(server, subAppsByPath);
  }

  const routeHandler = templateRouting.makeRouteTemplateSelector(routeOptions);

  return routeHandler;
}

function searchRoutes(srcDir, pluginOpts) {
  // there should be a src/routes.js file with routes spec
  const { loadRoutesFrom } = pluginOpts;

  const routesFile = [
    loadRoutesFrom && Path.resolve(srcDir, loadRoutesFrom),
    Path.resolve(srcDir, "routes")
  ].find(x => x && optionalRequire(x));

  const spec = routesFile ? require(routesFile) : {};

  const topOpts = _.merge(
    getDefaultRouteOptions(),
    { dir: Path.resolve(srcDir) },
    _.omit(spec, ["routes", "default"]),
    pluginOpts
  );

  topOpts.routes = _.merge({}, spec.routes || spec.default, topOpts.routes);

  // routes can either be in default (es6) or routes
  const routes = topOpts.routes;

  // in case needed, add full protocol/host/port to dev bundle base URL
  topOpts.devBundleBase = subAppUtil.formUrl({
    ..._.pick(topOpts.devServer, ["protocol", "host", "port"]),
    path: topOpts.devBundleBase
  });

  return { routes, topOpts };
}

module.exports = {
  searchRoutes,
  setupRouteTemplate
};
