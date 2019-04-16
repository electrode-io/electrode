"use strict";

/* eslint-disable global-require */

const assert = require("assert");

module.exports = {
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
  }
};
