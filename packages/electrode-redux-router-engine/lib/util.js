"use strict";

const Path = require("path");
const Fs = require("fs");

module.exports = {
  es6Default: m => {
    return m.default || m;
  },
  resolveModulePath: (p, baseDir) => {
    if (p.startsWith("/")) return p;

    return p.startsWith(".") ? Path.resolve(baseDir || "", p) : p;
  },
  getTargetByQuery: (query, envTargets) => {
    const __dist = query && query.__dist;
    return envTargets.includes(__dist) ? __dist : "default";
  },
  getEnvTargets: () =>
    Fs.readdirSync(Path.resolve("./")).reduce(
      (targets, v) => {
        if (v.startsWith("dist-")) targets.push(v.substring("dist-".length));
        return targets;
      },
      ["default"]
    )
};
