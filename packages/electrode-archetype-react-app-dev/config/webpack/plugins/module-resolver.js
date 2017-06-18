"use strict";

const Path = require("path");
const requireAt = require("require-at");
const optionalRequire = require("optional-require");

/*
 * This is a webpack module resolver plugin to ensure that modules are resolved from
 * the archetype's directory to make sure if there are multiple versions of a module,
 * the one the archetype depends on will be used.
 */
module.exports = class ModuleResolver {
  constructor(source, path, target) {
    this.source = source;
    this.path = path || "node_modules";
    this.target = target;
  }

  apply(resolver) {
    const archetypeDir = Path.join(__dirname, "..", "..", "..");
    resolver.plugin(this.source, (req, callback) => {
      let atPath = req.path;
      //
      // if require is NOT originated from a dir within node_modules, then
      // call require.resolve from within the archetype's directory
      // to make sure the instance the archetype depends on is resolved.
      //
      if (atPath.indexOf(this.path) < 0) {
        atPath = archetypeDir;
      }
      const resolved = optionalRequire.resolve(requireAt(atPath), req.request, false);
      if (!resolved) {
        return callback();
      }

      const splits = req.request.split("/");
      const nameIdx = resolved.lastIndexOf(`${Path.sep}${splits[0]}${Path.sep}`);
      const path = resolved.substr(0, nameIdx);

      const obj = Object.assign({}, req, {
        path,
        request: `./${req.request}`
      });
      return resolver.doResolve(
        this.target,
        obj,
        `looking for modules in ${obj.path}`,
        callback,
        true
      );
    });
  }
};
