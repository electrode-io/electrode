"use strict";

const Module = require("module");
const assert = require("assert");
const fs = require("fs");
const archetype = require("../config/archetype");
const Path = require("path");
const logger = require("../lib/logger");

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
        logger.info(`OptimizeModulesForProduction - skipping since NODE_ENV !== "production"`);
      }
      return;
    } else if (verbose) {
      logger.info(`OptimizeModulesForProduction - force enabled`);
    }
  }

  const modules = readProdDir();

  if (modules.length > 0) {
    assert(Module._resolveFilename, "module._resolveFilename is not defined");
    assert(
      typeof Module._resolveFilename === "function",
      "module._resolveFilename is not function"
    );

    const notified = {};

    const notify = m => {
      if (verbose && !notified[m]) {
        logger.info(`Overriding module ${m} with copy optimized for production`);
        notified[m] = true;
      }
    };

    Module._resolveFilename = function(request, parent) {
      if (isProd()) {
        const name = modules.find(m => {
          return m === request || request.startsWith(`${m}/`);
        });

        if (name && !request.startsWith(`${name}/dist`)) {
          notify(name);
          request = Path.join(prodModulesDir, request);
        }
      }

      return originalResolve.call(this, request, parent);
    };
  } else if (verbose) {
    logger.info(
      `OptimizeModulesForProduction - no optimized modules found in ${archetype.prodModulesDir}`
    );
  }
}

module.exports = optimizeModulesForProduction;
