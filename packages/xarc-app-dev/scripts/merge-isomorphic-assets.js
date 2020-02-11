"use strict";

const Fs = require("fs");
const filterScanDir = require("filter-scan-dir");
const Path = require("path");

const isMain = require.main === module;

function mergeIsomorphicAssets() {
  const filenames = filterScanDir.sync({
    dir: process.cwd(),
    includeRoot: true,
    filterDir: dir => ["dist", "dll"].indexOf(dir) >= 0,
    filter: (f, p, e) => e.noExt === "isomorphic-assets"
  });

  const assets = filenames.reduce(
    (result, filename) => {
      const fileAssets = require(filename);

      Object.assign(result.marked, fileAssets.marked);
      Object.assign(result.chunks, fileAssets.chunks);

      return result;
    },
    {
      chunks: {},
      marked: {}
    }
  );

  const assetsPath = Path.resolve("dist/isomorphic-assets.json");

  Fs.writeFileSync(assetsPath, JSON.stringify(assets, null, 2));
  if (isMain) process.exit(0);
}

module.exports = mergeIsomorphicAssets;

if (isMain) {
  mergeIsomorphicAssets();
}
