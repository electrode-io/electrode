"use strict";

/* eslint-disable global-require */

const Fs = require("fs");
const Path = require("path");
const mkdirp = require("mkdirp");
const _ = require("lodash");
const INDENT = 2;
const archetype = require("@xarc/app/config/archetype");

module.exports = function(opts) {
  const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

  const statsOptions = {
    filename: opts.filename || "../server/stats.json",
    fields: ["assetsByChunkName", "assets", "entrypoints", "chunks"]
  };

  if (opts && opts.fullPaths) {
    // generate stats json with full paths
    statsOptions.fields = null;
  }

  const cleanupChunks = stats => {
    // cleanup chunks with only essential info if it's requested
    // otherwise it's included a huge amount of data like modules etc
    if (stats.chunks) {
      stats.chunks = stats.chunks.map(c => {
        return _.pick(c, ["id", "hash", "names", "entry", "initial", "rendered", "reason"]);
      });
    }

    if (stats.entrypoints) {
      stats.entrypoints = Object.entries(stats.entrypoints).reduce((ep, [name, e]) => {
        ep[name] = e.chunks;
        return ep;
      }, {});
    }
    return stats;
  };

  if (process.env.WEBPACK_DEV === "true") {
    //
    // save a physical version of stats to .etmp/stats.json
    // in webpack dev server mode.
    //
    statsOptions.transform = data => {
      cleanupChunks(data);
      const dir = archetype.webpack.devArtifactsPath || archetype.eTmpDir;
      mkdirp.sync(dir);
      const str = JSON.stringify(data, null, INDENT);
      Fs.writeFileSync(Path.resolve(dir, "stats.json"), str);
      return str;
    };
  } else {
    statsOptions.transform = stats => {
      cleanupChunks(stats);
      return JSON.stringify(stats, null, INDENT);
    };
  }

  return {
    plugins: [new StatsWriterPlugin(statsOptions)]
  };
};
