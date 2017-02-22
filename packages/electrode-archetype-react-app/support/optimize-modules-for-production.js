"use strict";

const Module = require("module");
const assert = require("assert");
const fs = require("fs");
const archetype = require("../config/archetype");
const Path = archetype.Path;

/* eslint max-statements: 0 */
function optimizeModulesForProduction(options) {
  const originalResolve = Module._resolveFilename;

  options = options || {};
  const prodModulesDir = Path.resolve(options.prodModulesDir || archetype.prodModulesDir);

  const isProd = () => process.env.NODE_ENV === "production";

  const readProdDir = () => {
    try {
      return fs.readdirSync(prodModulesDir);
    } catch (err) {
      return [];
    }
  };

  const verbose = !options.quiet;

  if (!isProd()) {
    if (!options.force) {
      if (verbose) {
        console.log(`Just FYI: optimizeModulesForProduction - skipping since NODE_ENV !== "production"`); // eslint-disable-line
      }
      return;
    } else if (verbose) {
      console.log(`Just FYI: optimizeModulesForProduction - force enabled`); // eslint-disable-line
    }
  }

  const modules = readProdDir();

  if (modules.length > 0) {
    assert(Module._resolveFilename, "module._resolveFilename is not defined");
    assert(typeof Module._resolveFilename === "function", "module._resolveFilename is not function");

    const notified = {};

    const notify = (m) => {
      if (verbose && !notified[m]) {
        console.log(`Just FYI: overriding module ${m} with copy optimized for production`); // eslint-disable-line
        notified[m] = true;
      }
    };

    Module._resolveFilename = function (request, parent) {
      if (isProd()) {
        const name = modules.find((m) => {
          return (m === request) || request.startsWith(`${m}/`);
        });

        if (name && !request.startsWith(`${name}/dist`)) {

          notify(name);
          request = Path.join(prodModulesDir, request);
        }
      }

      return originalResolve.call(this, request, parent);
    };
  } else if (verbose) {
    console.log(`Just FYI: optimizeModulesForProduction - no optimized modules found in ${archetype.prodModulesDir}`); // eslint-disable-line
  }
}

module.exports = optimizeModulesForProduction;
