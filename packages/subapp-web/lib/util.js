"use strict";

/* eslint-disable global-require, max-statements, no-loop-func */

const Fs = require("fs");
const assert = require("assert");
const Path = require("path");
const _ = require("lodash");

let CDN_ASSETS;
let CDN_JS_BUNDLES;
let FrameworkLib;

const utils = {
  getFramework(ref) {
    return new FrameworkLib(ref);
  },

  setupFramework(frameworkLib) {
    FrameworkLib = frameworkLib;
  },

  resetCdn() {
    CDN_ASSETS = undefined;
    CDN_JS_BUNDLES = undefined;
  },
  //
  // Each subapp is an entry, which has an array of all bundle IDs
  // using IDs to lookup bundle name from assets.chunksById
  // keep only chunks with name starts with subapp name
  // map chunks to actual assets
  //
  getSubAppBundle: (name, assets) => {
    const entryName = name.toLowerCase();
    // find entry point
    const entryPoints = assets.entryPoints[entryName];
    assert(entryPoints, `subapp-web: no entry point found for ${name}`);

    // without webpack optimization.runtimeChunk the entry point bundles are generated
    // as <entryName>.bundle.js, like header.bundle.js
    // but with runtimeChunk, the entry point are generated with hash
    // as <hash>.<entryName>.js
    // So check both cases.
    const matchEntry = x => x === `${entryName}.bundle.js` || x.endsWith(`.${entryName}.js`);
    // map all IDs to actual assets
    const bundleAssets = entryPoints
      .map(id => {
        let bundleName;
        const js = assets.chunksById.js[id];
        // Only use IDs that has bundle with name that starts with entry's name
        if (Array.isArray(js)) {
          bundleName = js.find(matchEntry);
        } else if (matchEntry(js)) {
          bundleName = js;
        }
        return bundleName && assets.js.find(x => x.name === bundleName);
      })
      .filter(x => x);
    assert(
      bundleAssets.length > 0,
      `subapp-web: ${name} doesn't have a JS bundle for entry ${entryName}`
    );
    // TODO: handle subapp bundle that got broken into multiple chunks, when splitChunks
    // minSize + maxSize cause it to be broken up
    return bundleAssets[0];
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
      const bundles = bundlesById[id];
      [].concat(bundles).forEach(bundleFile => {
        for (const mapName in CDN_ASSETS) {
          if (mapName.endsWith(bundleFile)) {
            cdnBundles[id] = CDN_ASSETS[mapName];
            break;
          }
        }

        if (!cdnBundles[id]) {
          cdnBundles[id] = basePath.concat(bundleFile);
        } else {
          cdnBundles[id] = [].concat(cdnBundles[id], bundleFile);
        }
      });
    }

    return cdnBundles;
  },

  getCdnJsBundles(assets, routeOptions, cdnAssetsFile) {
    if (CDN_JS_BUNDLES) {
      return CDN_JS_BUNDLES;
    }

    //
    // pack up entrypoints data from stats
    //

    const { chunksById } = assets;

    const bundleBase = utils.getBundleBase(routeOptions);

    return (CDN_JS_BUNDLES = utils.mapCdnAssets(chunksById.js, bundleBase, cdnAssetsFile));
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

        // in dev mode, chunk id is the same as the name
        // in prod mode, chunk id is an integer (index)
        if (names.indexOf(id) < 0) {
          // save the names for the id
          _.set(byChunkId, ["_names_", id], names);
        }

        names.forEach(name => {
          const assets = stats.assetsByChunkName[name];

          // now assign the assets into byChunkId according to extensions
          []
            .concat(assets)
            .filter(x => x)
            .forEach(asset => {
              const ext = Path.extname(asset).substring(1);
              assert(ext, `asset ${asset} doesn't have extension`);
              const found = _.get(byChunkId, [ext, id]);
              if (found) {
                if (found.indexOf(asset) < 0) {
                  byChunkId[ext][id] = [].concat(found, asset);
                }
              } else {
                _.set(byChunkId, [ext, id], asset);
              }
            });
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
