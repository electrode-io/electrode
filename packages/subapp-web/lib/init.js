"use strict";

/* eslint-disable max-statements */

const Fs = require("fs");
const Path = require("path");
const util = require("./util");
const subappUtil = require("subapp-util");

module.exports = function setup(setupContext) {
  const distDir = process.env.NODE_ENV === "production" ? "../dist" : "../browser";
  const clientJs = Fs.readFileSync(Path.join(__dirname, distDir, "subapp-web.js")).toString();
  const littleLoader = Fs.readFileSync(
    require.resolve("little-loader/dist/little-loader.min.js"),
    "utf8"
  );

  const routeData = setupContext.routeOptions.__internals;

  const vendorAssets = util.getVendorBundles(routeData.assets);
  const bundleBase = util.getBundleBase(setupContext.routeOptions);
  const bundleNames = vendorAssets.map(a => a.chunkNames[0]);
  let vendorBundleLoadJs = "";
  let commonScript = "";
  if (vendorAssets.length > 0) {
    vendorBundleLoadJs = `markBundlesLoaded(${JSON.stringify(bundleNames)});`;
    commonScript = vendorAssets
      .map(a => `<script src="${bundleBase}${a.name}" async></script>`)
      .join("\n");
  }

  const jsBundleByChunkName = Object.entries(routeData.assets.byChunkName).reduce(
    (a, [name, bundle]) => {
      a[name] = Array.isArray(bundle) ? bundle.find(x => x.endsWith(".js")) : bundle;
      return a;
    },
    {}
  );

  const bundleAssets = {
    byChunkName: jsBundleByChunkName,
    basePath: bundleBase
  };
  const webSubAppJs = `\n<script id="bundleAssets" type="application/json">
${JSON.stringify(bundleAssets)}
</script>
<script>${littleLoader}
${clientJs}
${vendorBundleLoadJs}
</script>
`;

  const subAppServers = Object.keys(subappUtil.getAllSubAppManifest())
    .map(name => subappUtil.loadSubAppServerByName(name))
    .filter(x => x && x.initialize);

  return {
    process: context => {
      if (subAppServers.length > 0) {
        for (const server of subAppServers) {
          server.initialize(context);
        }
      }

      return `${commonScript}${webSubAppJs}`;
    }
  };
};
