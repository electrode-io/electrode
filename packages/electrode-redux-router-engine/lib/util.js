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
  getExtractor: statsFile =>
    Fs.existsSync(statsFile)
      ? new ChunkExtractor({ statsFile })
      : {
          collectChunks: app => app
        },
  getExtractor1: async statsFile => {
    let extractor = {
      collectChunks: app => app
    };
    if (process.env.NODE_ENV === "development") {
      let stats, code;
      try {
        const { response, body } = await request("http://localhost:2992/js/loadable-stats.json");  // TODO: ECONREFUSED 
        stats = JSON.parse(body);
        code = response.statusCode;
      } catch (e) {
        console.error(e);
      }
      if (code === 200) extractor = new ChunkExtractor({ stats });
    } else if (Fs.existsSync(statsFile)) {
      extractor = new ChunkExtractor({ statsFile });
    }
    return extractor;
  }
};
