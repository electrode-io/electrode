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

function setupRouteTemplate({ subAppsByPath, srcDir, routeOptions }) {
  updateFullTemplate(routeOptions.dir, routeOptions);
  const chunkSelector = resolveChunkSelector(routeOptions);
  routeOptions.__internals = { chunkSelector };

  // load subapps for the route
  if (routeOptions.subApps) {
    routeOptions.__internals.subApps = [].concat(routeOptions.subApps).map(x => {
      let options = {};
      if (Array.isArray(x)) {
        options = x[1];
        x = x[0];
      }
      // absolute: use as path
      // else: assume dir under srcDir
      // TBD: handle it being a module
      return {
        subapp: subAppsByPath[Path.isAbsolute(x) ? x : Path.resolve(srcDir, x)],
        options
      };
    });
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
