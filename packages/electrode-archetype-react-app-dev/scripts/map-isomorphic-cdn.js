"use strict";

let appDir = process.cwd();

if (process.argv[2]) {
  appDir = process.argv[2];
}

const fs = require("fs");
const Path = require("path");
const isoConfigFile = Path.join(appDir, ".isomorphic-loader-config.json");
const cdnAssetsFile = Path.join(appDir, "config/assets.json");
const isoConfig = require(isoConfigFile);
const cdnAssets = require(cdnAssetsFile);

const uniques = Object.keys(cdnAssets).reduce((acc, k) => {
  const base = Path.dirname(cdnAssets[k]);
  acc[base] = acc[base] ? acc[base]++ : 1;
  return acc;
}, {});

const paths = Object.keys(uniques);

if (paths.length > 1) {
  console.log("Error: CDN upload files has different base paths");
  paths.forEach((p) => {
    console.log(` - "${p}"`);
  });
  process.exit(1);
}

if (paths.length === 1) {
  let pp = paths[0].trim();
  pp += pp.endsWith("/") ? "" : "/";
  isoConfig.output.publicPath = pp;
  fs.writeFileSync(isoConfigFile, JSON.stringify(isoConfig, null, 2));
  console.log(`\n===\nISOMORPHIC loader config publicPath updated to CDN path ${pp}\n`);
} else {
  console.log(`No CDN path found from CDN assets file ${cdnAssetsFile}`);
}

process.exit(0);
