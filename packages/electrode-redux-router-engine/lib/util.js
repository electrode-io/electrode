"use strict";

const Path = require("path");
const Fs = require("fs");
const { ChunkExtractor } = require("@loadable/server");

module.exports = {
  es6Default: m => {
    return m.default || m;
  },
  resolveModulePath: (p, baseDir) => {
    if (p.startsWith("/")) return p;

    return p.startsWith(".") ? Path.resolve(baseDir || "", p) : p;
  },
  createdStatExtractor: target => {
    const filename = `${target !== "default" ? `${target}-` : ""}loadable-stats.json`;
    const statsFile = Path.resolve(`./dist/server/${filename}`);
    return Fs.existsSync(statsFile)
      ? new ChunkExtractor({ statsFile })
      : {
          collectChunks: app => app
        };
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
