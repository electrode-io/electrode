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
  if (!isModuleRequest(req)) return undefined;

  const splits = req.split("/");
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

  if (!resolved) return undefined;

  splits.splice(0, nameX, ".");

  return {
    path: Path.dirname(resolved),
    request: splits.join("/")
  };
}

module.exports = {
  isModuleRequest,
  resolve
};
