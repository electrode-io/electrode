"use strict";

const Path = require("path");
const nodeResolver = require("../../../lib/node-resolver");

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
      //
      // If require is NOT originated from a dir within node_modules, then
      // call require.resolve from within the archetype's directory
      // to make sure the instance the archetype depends on is resolved.
      //
      const atPath = req.path.indexOf(this.path) < 0 ? archetypeDir : req.path;

      const result = nodeResolver.resolve(req.request, atPath);

      //
      // Let webpack's internal resolver deal with requiring non-modules
      //
      if (result === undefined) return callback();

      const obj = Object.assign({}, req, result);

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
