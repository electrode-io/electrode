/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable global-require */

import * as Path from "path";
import * as Fs from "fs";
import * as _ from "lodash";

const mkdirp = require("mkdirp");
const INDENT = 2;
const archetype = require("@xarc/app-dev/config/archetype")();

module.exports = function(opts) {
  const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

  const statsOptions: any = {
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
        ep[name] = (e as any).chunks;
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
