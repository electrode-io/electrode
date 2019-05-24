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
  createdStatExtractor: isProd => {
    const statsFile = Path.resolve(`./dist/${isProd ? "js" : "server"}/loadable-stats.json`);
    return Fs.existsSync(statsFile)
      ? new ChunkExtractor({ statsFile })
      : {
          collectChunks: app => app
        };
  }
};
