"use strict";

/* eslint-disable prefer-template */

const Path = require("path");
const requireAt = require("require-at");
const optionalRequire = require("optional-require");

function isModuleRequest(request) {
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

function resolve(req, atPath) {
  if (!isModuleRequest(req))
    // can only resolve modules under node_modules
    return undefined;

  const splits = req.split("/");
  const nameX = splits[0].startsWith("@") ? 2 : 1; // check for scoped module
  const name = splits.slice(0, nameX).join("/");

  const _xreq = requireAt(atPath);

  //
  // All modules must have package.json
  //
  const resolved = optionalRequire.resolve(
    _xreq,
    // some packages doesn't have index.js nor specify main so just require by
    // its name will fail but we expect it to have a package.json file.
    // ensure require request paths are POSIX
    Path.join(name, "package.json"),
    {
      default: false,
      fail(err) {
        // newer version of node.js with ESM support restrict importing
        // files that're not specified in package.json
        if (err.code === "ERR_PACKAGE_PATH_NOT_EXPORTED") {
          return optionalRequire.resolve(_xreq, name, false);
        }
        throw err;
      }
    }
  );

  if (!resolved) return undefined;

  // ensure windows \ path separator changed to / when matching for require
  // req name, which should always be using /.
  const ix = resolved.replace(/\\/g, "/").lastIndexOf(`${name}/`);
  const path = ix >= 0 ? resolved.substr(0, ix + name.length) : Path.dirname(resolved);

  splits.splice(0, nameX, ".");
  const request = splits.join("/");

  return { path, request };
}

module.exports = {
  isModuleRequest,
  resolve
};
