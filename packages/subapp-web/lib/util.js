"use strict";

/* eslint-disable global-require, max-statements */

const Fs = require("fs");
const assert = require("assert");
const Path = require("path");
const _ = require("lodash");

let CDN_ASSETS;
let CDN_JS_BUNDLES;

const utils = {
  getVendorBundles: assets => {
    const chunkNames = Object.keys(assets.byChunkName)
      .filter(x => x.startsWith("vendors~") || x.startsWith("shared~"))
      .map(x => {
        const a = assets.byChunkName[x];
        if (Array.isArray(a)) {
          return a.find(e => e.endsWith(".js"));
        } else {
          return a;
        }
      });
    return assets.js.filter(a => {
      return chunkNames.indexOf(a.name) >= 0;
    });
  },

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

  mapCdnAssets(bundlesByName, basePath = "", assetsFile = "config/assets.json") {
    if (!CDN_ASSETS) {
      const assetsFp = Path.resolve(assetsFile);
      try {
        CDN_ASSETS = require(assetsFp);
      } catch (err) {
        CDN_ASSETS = {};
      }
    }

    const cdnBundles = {};
    const bundleNames = Object.keys(bundlesByName);

    for (const name of bundleNames) {
      const bundleFile = bundlesByName[name];
      for (const mapName in CDN_ASSETS) {
        if (mapName.endsWith(bundleFile)) {
          cdnBundles[name] = CDN_ASSETS[mapName];
          break;
        }
      }

      if (!cdnBundles[name]) {
        cdnBundles[name] = basePath.concat(bundlesByName[name]);
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

    const { byChunkName } = assets;

    const jsBundleByChunkName = Object.entries(byChunkName).reduce((a, [name, bundle]) => {
      a[name] = Array.isArray(bundle) ? bundle.find(x => x.endsWith(".js")) : bundle;
      return a;
    }, {});

    const bundleBase = utils.getBundleBase(routeOptions);

    return (CDN_JS_BUNDLES = utils.mapCdnAssets(jsBundleByChunkName, bundleBase));
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
    const manifestAsset = _.find(stats.assets, asset => {
      return asset.name.endsWith("manifest.json");
    });

    const jsAssets = stats.assets.filter(asset => {
      return asset.name.endsWith(".js");
    });

    const cssAssets = stats.assets.filter(asset => {
      return asset.name.endsWith(".css");
    });

    if (manifestAsset) {
      assets.manifest = manifestAsset.name;
    }

    assets.js = jsAssets;
    assets.css = cssAssets;
    assets.byChunkName = stats.assetsByChunkName;
    assets.entryPoints = stats.entrypoints;

    return { assets, stats };
  }
};

module.exports = utils;
