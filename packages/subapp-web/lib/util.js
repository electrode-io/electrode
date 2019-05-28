"use strict";

/* eslint-disable global-require, max-statements */

const assert = require("assert");
const Path = require("path");

let CDN_ASSETS;
let CDN_JS_BUNDLES;

const utils = {
  getVendorBundles: assets => {
    const chunkNames = Object.keys(assets.byChunkName)
      .filter(x => x.startsWith("vendors"))
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
    if (process.env.NODE_ENV === "production" || process.env.WEBPACK_DEV !== "true") {
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

  getCdnJsBundles(byChunkNameAssets, routeOptions) {
    if (CDN_JS_BUNDLES) {
      return CDN_JS_BUNDLES;
    }

    const jsBundleByChunkName = Object.entries(byChunkNameAssets).reduce((a, [name, bundle]) => {
      a[name] = Array.isArray(bundle) ? bundle.find(x => x.endsWith(".js")) : bundle;
      return a;
    }, {});

    const bundleBase = utils.getBundleBase(routeOptions);

    return (CDN_JS_BUNDLES = utils.mapCdnAssets(jsBundleByChunkName, bundleBase));
  }
};

module.exports = utils;
