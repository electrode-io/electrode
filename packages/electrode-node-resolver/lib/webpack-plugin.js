"use strict";

const Path = require("path");
const assert = require("assert");
const nodeResolver = require("./node-resolver");

/*
 * A webpack module resolver plugin intended to be used by Electrode archetypes.
 * It helps to ensure that modules are resolved from the archetype's directory
 * to make sure if there are multiple versions of a module, the one the archetype
 * depends on will be used.
 */
// updated for webpack 4
module.exports = class ModuleResolver {
  /*
   * source - webpack's plugin source
   * target - webpack's resolve target
   * originDir - default origin dir to use if require path was not
   *             detected to be from within node_modules
   * nmPath - a string that if require path contains would indicate
   *          originated from within node_modules
   */
  constructor(source, target, originDir, nmPath) {
    this.source = source;
    this.nmPath = nmPath || "node_modules";
    this.originDir = originDir;
    this.target = target;
    assert(
      typeof originDir === "string",
      "electrode-node-resolver webpack plugin: must provide originDir"
    );
  }

  apply(resolver) {
    resolver.getHook(this.source).tapAsync("NodeResolver", (req, resolveContext, callback) => {
      const target = resolver.ensureHook(this.target);
      //
      // If require is NOT originated from a dir within node_modules, then
      // call require.resolve from within the archetype's directory
      // to make sure the instance the archetype depends on is resolved.
      //
      const atPath = req.path.indexOf(this.nmPath) < 0 ? this.originDir : req.path;

      const result = nodeResolver.resolve(req.request, atPath);

      //
      // Let webpack's internal resolver deal with requiring non-modules
      //
      if (result === undefined) return callback();

      const obj = Object.assign({}, req, result);

      return resolver.doResolve(
        target,
        obj,
        `looking for modules in ${obj.path}`,
        resolveContext,
        callback
      );
    });
  }
};
