"use strict";

const fs = require("fs");
const glob = require("glob");
const path = require("path");

const assetsPattern = path.resolve("@(dist|dll)/isomorphic-assets.*");
const assetsPath = path.resolve("dist/isomorphic-assets.json");

glob(assetsPattern, (readErr, filenames) => {
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

  fs.writeFile(assetsPath, JSON.stringify(assets, null, 2), err => {
    if (err) {
      throw err;
    }
  });
});
