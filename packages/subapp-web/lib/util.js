"use strict";

/* eslint-disable global-require, max-statements */

const Fs = require("fs");
const assert = require("assert");
const Path = require("path");
const _ = require("lodash");

let CDN_ASSETS;
let CDN_JS_BUNDLES;

const utils = {
  getSubAppBundle: (name, assets) => {
    const bundleName = `${name.toLowerCase()}`;
    const bundleAsset = assets.js.find(j => j.chunkNames[0] === bundleName);
    assert(bundleAsset, `subapp-web: ${name} doesn't have a JS bundle ${bundleName}`);
    return bundleAsset;
  },

  getBundleBase: routeData => {
    if (process.env.NODE_ENV === "production" || !routeData.webpackDev) {
      return routeData.prodBundleBase;
    } else {
      return routeData.devBundleBase;
    }
  },

  /*
    From an object of bundles:

    {
      bundleName: "bundle-file.js"
    }

    map with a CDN assets object:

    {
      "/dist/js/bundle-file.js": "/cdn.com/hash-12345.js"
    }

    to:

    {
      bundleName: "/cdn.com/hash-12345.js"
    }

    If a bundleName doesn't have a CDN map, then its URL is created by prepending basePath:

    {
      bundleName: "${basePath}bundle-file.js"
    }
  */

  mapCdnAssets(bundlesById, basePath = "", assetsFile = "config/assets.json") {
    if (!CDN_ASSETS) {
      const assetsFp = Path.resolve(assetsFile);
      try {
        CDN_ASSETS = require(assetsFp);
      } catch (err) {
        CDN_ASSETS = {};
      }
    }

    const cdnBundles = {};

    for (const id in bundlesById) {
      const bundleFile = bundlesById[id];
      for (const mapName in CDN_ASSETS) {
        if (mapName.endsWith(bundleFile)) {
          cdnBundles[id] = CDN_ASSETS[mapName];
          break;
        }
      }

      if (!cdnBundles[id]) {
        cdnBundles[id] = basePath.concat(bundleFile);
      }
    }

    return cdnBundles;
  },

  getCdnJsBundles(assets, routeOptions) {
    if (CDN_JS_BUNDLES) {
      return CDN_JS_BUNDLES;
    }

    //
    // pack up entrypoints data from stats
    //

    const { chunksById } = assets;

    const bundleBase = utils.getBundleBase(routeOptions);

    return (CDN_JS_BUNDLES = utils.mapCdnAssets(chunksById.js, bundleBase));
  },

  getChunksById(stats) {
    //
    // generate a byChunkId object so we can map entry points chunks like this:
    // id = entrypoints.<entryName>[0,1,2...]
    // .js asset URL = byChunkId.js[id], .css asset URL = byChunkId.css[id],
    // .map asset URL = byChunkId.map[id]
    //
    const chunksById = stats.chunks.reduce((a, chunk) => {
      a[chunk.id] = chunk;
      return a;
    }, {});

    const byChunkId = {};
    for (const ep in stats.entrypoints) {
      for (const id of stats.entrypoints[ep]) {
        const names = chunksById[id].names;
        // only expecting one file per chunk for now
        assert(
          names.length === 1,
          `stats.chunks[${id}].names length ${names.length} must be 1: ${names.join(", ")}`
        );

        if (id !== names[0]) {
          _.set(byChunkId, ["_names_", id], names[0]);
        }

        const assets = stats.assetsByChunkName[names[0]];

        // now assign the assets into byChunkId according to extensions
        []
          .concat(assets)
          .filter(x => x)
          .forEach(x => {
            const ext = Path.extname(x).substring(1);
            assert(ext, `asset ${x} doesn't have extension`);
            _.set(byChunkId, [ext, id], x);
          });
      }
    }

    return byChunkId;
  },

  /**
   * Load stats.json which is created during build.
   * Attempt to load the stats.json file which contains a manifest of
   * The file contains bundle files which are to be loaded on the client side.
   *
   * @param {string} statsPath - path of stats.json
   * @returns {Promise.<Object>} an object containing an array of file names
   */
  loadAssetsFromStats(statsPath) {
    let stats;

    try {
      stats = JSON.parse(Fs.readFileSync(Path.resolve(statsPath)).toString());
    } catch (err) {
      return {};
    }

    const assets = {};
    const manifestAsset = _.find(stats.assets, asset => asset.name.endsWith("manifest.json"));
    if (manifestAsset) {
      assets.manifest = manifestAsset.name;
    }

    //
    // How we determine the assets needed for each entry point:
    //
    // entryPoints:[id] => chunks.id:names[0] => assetsByChunkName[name] => bundle URL
    // Note: there are some redundant info in stats.  For example, stats.assets.chunks is
    // an array of chunk IDs, but at this point assuming the chunks array has length 1 only.
    //

    assets.chunksById = utils.getChunksById(stats);
    assets.js = stats.assets.filter(asset => asset.name.endsWith(".js"));
    assets.css = stats.assets.filter(asset => asset.name.endsWith(".css"));
    assets.entryPoints = stats.entrypoints;
    assets.chunks = stats.chunks;

    return { assets, stats };
  }
};

module.exports = utils;
