/* eslint-disable */
"use strict";

/* eslint-disable max-statements, no-process-exit */

const logger = require("../lib/logger");
const fs = require("fs");
const Path = require("path");
const isMain = require.main === module;

function exit(code) {
  if (isMain) process.exit(code);
}

function mapIsomorphicCdn(appDir) {
  appDir = appDir || process.cwd();
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
    logger.error("CDN upload files has different base paths");
    paths.forEach((p) => {
      logger.info(` - "${p}"`);
    });
    exit(1);
  }

  if (paths.length === 1) {
    let pp = paths[0].trim();
    pp += pp.endsWith("/") ? "" : "/";
    isoConfig.output.publicPath = pp;
    fs.writeFileSync(isoConfigFile, JSON.stringify(isoConfig, null, 2));
    logger.info(`\n===\nISOMORPHIC loader config publicPath updated to CDN path ${pp}\n`);
  } else {
    logger.info(`No CDN path found from CDN assets file ${cdnAssetsFile}`);
  }

  exit(0);
}

if (isMain) {
  mapIsomorphicCdn(process.argv[2]);
}

module.exports = mapIsomorphicCdn;
//# fynSourceMap=false
