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
  getTargetByQuery: query => {
    const { __dist } = query;
    let target = "default";
    if (__dist && Fs.existsSync(Path.resolve(`dist-${__dist}`))) {
      target = __dist;
    }
    return target;
  }
};
