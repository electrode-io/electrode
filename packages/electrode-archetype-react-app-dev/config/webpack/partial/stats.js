"use strict";

const Fs = require("fs");
const Path = require("path");
const mkdirp = require("mkdirp");
const INDENT = 2;
const archetype = require("electrode-archetype-react-app/config/archetype");

module.exports = function(opts) {
  const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

  const statsOptions = {
    filename: opts.filename || "../server/stats.json",
    fields: ["assetsByChunkName", "assets"]
  };

  if (opts && opts.fullPaths) {
    // generate stats json with full paths
    statsOptions.fields = null;
  }

  if (process.env.WEBPACK_DEV === "true") {
    //
    // save a physical version of stats to .etmp/stats.json
    // in webpack dev server mode.
    //
    statsOptions.transform = data => {
      const dir = archetype.webpack.devArtifactsPath || archetype.eTmpDir;
      mkdirp.sync(dir);
      const str = JSON.stringify(data, null, INDENT);
      Fs.writeFileSync(Path.resolve(dir, "stats.json"), str);
      return str;
    };
  }

  if (process.env.OPTIMIZE_STATS === "true") {
    statsOptions.fields = null;
    statsOptions.transform = data => {
      data.modules.forEach(m => {
        delete m.source;
      });
      delete data.children;
      return JSON.stringify(data, null, 2);
    };
  }

  return {
    plugins: [new StatsWriterPlugin(statsOptions)]
  };
};
