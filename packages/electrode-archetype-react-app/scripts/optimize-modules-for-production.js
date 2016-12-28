"use strict";

const Module = require("module");
const Path = require("path");
const assert = require("assert");
const fs = require("fs");

function optimizeModulesForProduction(options) {
  const originalResolve = Module._resolveFilename;

  options = options || {};
  const prodDir = Path.resolve(options.prodDir || ".prod");

  const isProd = () => process.env.NODE_ENV === "production";

  const readProdDir = () => {
    try {
      return fs.readdirSync(prodDir);
    } catch (err) {
      return [];
    }
  };

  const verbose = !options.quiet;

  if (!isProd()) {
    if (verbose) {
      console.log(`NOTICE: optimizeModulesForProduction - skipping since NODE_ENV !== "production"`); // eslint-disable-line
    }
    return;
  }

  const modules = readProdDir();

  if (modules.length > 0) {
    assert(Module._resolveFilename, "module._resolveFilename is not defined");
    assert(typeof Module._resolveFilename === "function", "module._resolveFilename is not function");

    const notified = {};

    const notify = (m) => {
      if (verbose && !notified[m]) {
        console.log(`NOTICE: overriding module ${m} with copy optimized for production`); // eslint-disable-line
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
          request = Path.join(prodDir, request);
        }
      }

      return originalResolve.call(this, request, parent);
    };
  } else if (verbose) {
    console.log(`NOTICE: optimizeModulesForProduction - no optimized modules found in .prod`); // eslint-disable-line
  }
}

module.exports = optimizeModulesForProduction;
