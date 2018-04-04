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

  isModuleRequest(request) {
    //
    // If request is not an absolute/relative path then it's requiring a
    // nodejs module.
    //
    if (Path.isAbsolute(request)) return false;

    if (request === "." || request === "..") {
      return false;
    }

    if (request.startsWith("../") || request.startsWith("./")) {
      return false;
    }

    if (Path.sep !== "/") {
      return !request.startsWith("." + Path.sep) || !request.startsWith(".." + Path.sep);
    }

    return true;
  }

  apply(resolver) {
    const archetypeDir = Path.join(__dirname, "..", "..", "..");

    resolver.plugin(this.source, (req, callback) => {
      //
      // Let webpack's internal resolver deal with requiring non-modules
      //
      if (!this.isModuleRequest(req.request)) return callback();

      //
      // If require is NOT originated from a dir within node_modules, then
      // call require.resolve from within the archetype's directory
      // to make sure the instance the archetype depends on is resolved.
      //
      const atPath = req.path.indexOf(this.path) < 0 ? archetypeDir : req.path;

      //
      // If request is requiring for a module, then first try to resolve the
      // module's real path by looking for its package.json, and then use that
      // with request converted to a relative path without the module name part.
      //
      const splits = req.request.split("/");
      const nameX = splits[0].startsWith("@") ? 2 : 1; // check for scoped module
      const name = splits.slice(0, nameX).join("/");
      //
      // All modules must have package.json
      //
      const resolved = optionalRequire.resolve(
        requireAt(atPath),
        // ensure require request paths are POSIX
        Path.posix.join(name, "package.json"),
        false
      );

      if (!resolved) return callback();

      splits.splice(0, nameX, ".");

      const obj = Object.assign({}, req, {
        path: Path.dirname(resolved),
        request: splits.join("/")
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
