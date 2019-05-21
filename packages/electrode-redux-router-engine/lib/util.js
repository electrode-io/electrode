"use strict";

const Path = require("path");
const Fs = require("fs");
const { ChunkExtractor } = require("@loadable/server");
const Promise = require("bluebird");
const request = Promise.promisify(require("request"));

module.exports = {
  es6Default: m => {
    return m.default || m;
  },
  resolveModulePath: (p, baseDir) => {
    if (p.startsWith("/")) return p;

    return p.startsWith(".") ? Path.resolve(baseDir || "", p) : p;
  },
  getExtractor: async statsFile => {
    let extractor = {
      collectChunks: app => app
    };
    if (process.env.NODE_ENV === "development") {
      let stats;
      try {
        const { body } = await request("http://127.0.0.1:2992/js/loadable-stats.json");
        stats = JSON.parse(body);
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
      }
      if (stats) extractor = new ChunkExtractor({ stats });
    } else if (Fs.existsSync(statsFile)) {
      extractor = new ChunkExtractor({ statsFile });
    }
    return extractor;
  }
};
