"use strict";

/* eslint-disable max-params, no-empty */

const Path = require("path");
const requireAt = require("require-at");
const nodeResolver = require("../../lib/node-resolver");

/*
const path = "expect";

const x = {
  basedir: "/projects/electrode/samples/universal-react-node/node_modules/jest-jasmine2/build",
  browser: false,
  extensions: [".js", ".jsx"],
  moduleDirectory: ["node_modules", "src"],
  paths: null,
  rootDir: "/projects/electrode/samples/universal-react-node"
};
*/

/*
const path = "client/components/home"

const x = {
  basedir: "/projects/electrode/samples/universal-react-node/_test_/client/components",
  browser: false,
  extensions: [".js", ".jsx"],
  moduleDirectory: ["node_modules", "src"],
  paths: null,
  rootDir: "/projects/electrode/samples/universal-react-node"
};
*/

function searchNM(extensions, path, options) {
  for (const ext of extensions) {
    const result = nodeResolver.resolve(path + ext, options.basedir);
    if (result) {
      try {
        const x = requireAt(result.path).resolve(result.request);
        return x;
      } catch (e) {}
    }
  }
  return null;
}

function searchDir(extensions, dir, path, options) {
  for (const ext of extensions) {
    const f = Path.posix.join(options.rootDir, dir, path + ext);
    try {
      const x = requireAt(options.basedir).resolve(f);
      if (x) return x;
    } catch (e) {}
  }
  return null;
}

module.exports = function(path, options) {
  // TODO: check options.paths?

  if (!path) {
    return requireAt(options.basedir).resolve(".");
  }

  const extensions = [""].concat(options.extensions);

  if (nodeResolver.isModuleRequest(path)) {
    for (const dir of options.moduleDirectory || ["node_modules"]) {
      const x =
        dir === "node_modules"
          ? searchNM(extensions, path, options)
          : searchDir(extensions, dir, path, options);
      if (x) return x;
    }

    throw new Error("electrode jest.node-resolver failed module resolve");
  }

  // path must started with /, ./, or ../, so it's supposed to be a file
  // relative to basedir, so look for it by checking each extension
  for (const ext of extensions) {
    try {
      return requireAt(options.basedir).resolve(path + ext);
    } catch (e) {}
  }

  throw new Error("jest.node-resolver failed path resolve");
};
