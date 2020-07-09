"use strict";

/* eslint-disable max-statements, complexity, global-require, no-magic-numbers, no-console */

const _ = require("lodash");
const Fs = require("fs");
const Path = require("path");
const assert = require("assert");
const optionalRequire = require("optional-require")(require);
const scanDir = require("filter-scan-dir");

const { getDefaultRouteOptions, updateFullTemplate } = require("./utils");

async function searchRoutes(srcDir, pluginOpts) {
  const { loadRoutesFrom } = pluginOpts;

  const routesDir = [
    loadRoutesFrom && Path.resolve(srcDir, loadRoutesFrom),
    Path.resolve(srcDir, "routes"),
    Path.resolve(srcDir, "server", "routes"),
    Path.resolve(srcDir, "server-routes")
  ].find(x => x && Fs.existsSync(x) && Fs.statSync(x).isDirectory());

  // there's no routes, server/routes, or server-routes dir
  if (!routesDir) {
    return undefined;
  }

  //
  // look for routes under routesDir
  // - each dir inside is considered to be a route with name being the dir name
  //
  const dirs = await scanDir({ dir: routesDir, includeRoot: true, filter: f => f === "route.js" });

  //
  // load options for all routes from routesDir/options.js[x]
  //
  const options = optionalRequire(Path.join(routesDir, "options"), { default: {} });

  //
  // Generate routes: load the route.js file for each route
  //
  const routes = dirs.map(x => {
    const name = Path.dirname(x.substring(routesDir.length + 1));
    const route = Object.assign({}, require(x));
    _.defaults(route, {
      // the route dir that's named default is /
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

  const topOpts = _.merge(getDefaultRouteOptions(), options, pluginOpts);

  updateFullTemplate(routesDir, topOpts);

  return { topOpts, options, dir: routesDir, routes };
}

module.exports = {
  searchRoutes
};
