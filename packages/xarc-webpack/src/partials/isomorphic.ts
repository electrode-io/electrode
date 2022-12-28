/* eslint-disable @typescript-eslint/no-var-requires */

import { xAppRequire } from "@xarc/app";
import { loadXarcOptions } from "../util/load-xarc-options";

module.exports = function(opts) {
  const xarcOptions = loadXarcOptions();
  if (xarcOptions.webpack.disableSsr) {
      return {};
  }

  const { IsomorphicLoaderPlugin } = xAppRequire("isomorphic-loader");

  const plugin = new IsomorphicLoaderPlugin({
    appSrcDir: xarcOptions.AppMode.src.dir,
    assetsFile: opts.assetsFile || "../isomorphic-assets.json",
    webpackDev: {
      url: `http://${xarcOptions.webpack.devHostname}:${xarcOptions.webpack.devPort}`,
      addUrl: false
    }
  });

  if (process.send) {
    plugin.on("update", data => {
      process.send({ name: "isomorphic-loader-config", config: data.config });
    });
  }

  return {
    plugins: [plugin]
  };
};
