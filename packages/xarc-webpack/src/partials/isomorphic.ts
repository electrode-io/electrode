/* eslint-disable @typescript-eslint/no-var-requires */

import { IsomorphicLoaderPlugin } from "isomorphic-loader";
const archetypeConfig = require("@xarc/app-dev/config/archetype");

module.exports = function(opts) {
  const archetype = archetypeConfig();

  const plugin = new IsomorphicLoaderPlugin({
    assetsFile: opts.assetsFile || "../isomorphic-assets.json",
    webpackDev: {
      url: `http://${archetype.webpack.devHostname}:${archetype.webpack.devPort}`,
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
