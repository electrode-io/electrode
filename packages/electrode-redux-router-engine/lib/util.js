"use strict";

const Path = require("path");
const Fs = require("fs");
const { ChunkExtractor } = require("@loadable/server");
const statsFile = Path.resolve("./dist/js/loadable-stats.json");
let extractor;

module.exports = {
  es6Default: m => {
    return m.default || m;
  },
  resolveModulePath: (p, baseDir) => {
    if (p.startsWith("/")) return p;

    return p.startsWith(".") ? Path.resolve(baseDir || "", p) : p;
  },
  getExtractor: () => {
    if (process.env.NODE_ENV === "production" && extractor) return extractor;
    extractor = Fs.existsSync(statsFile)
      ? new ChunkExtractor({ statsFile })
      : {
          collectChunks: app => app
        };
    return extractor;
  }
};
