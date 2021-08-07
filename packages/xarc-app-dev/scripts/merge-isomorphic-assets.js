/* eslint-disable */
"use strict";

const Fs = require("fs");
const filterScanDir = require("filter-scan-dir");
const Path = require("path");
const _ = require("lodash");

const isMain = require.main === module;

function mergeIsomorphicAssets() {
  const filenames = filterScanDir.sync({
    dir: process.cwd(),
    includeRoot: true,
    filterDir: (dir) => ["dist", "dll"].indexOf(dir) >= 0,
    filter: (f, p, e) => e.noExt === "isomorphic-assets",
  });

  if (filenames.length > 1) {
    const assets = filenames.reduce((result, filename) => {
      const fileAssets = require(filename);

      _.merge(result, fileAssets);

      return result;
    }, {});

    const assetsPath = Path.resolve("dist/isomorphic-assets.json");

    Fs.writeFileSync(assetsPath, JSON.stringify(assets, null, 2));
    if (isMain) process.exit(0);
  }
}

module.exports = mergeIsomorphicAssets;

if (isMain) {
  mergeIsomorphicAssets();
}
