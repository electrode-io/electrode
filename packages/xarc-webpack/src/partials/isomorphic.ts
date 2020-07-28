/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";

const archetypeConfig = require("@xarc/app-dev/config/archetype");
const IsomorphicLoaderPlugin = require("isomorphic-loader/lib/webpack-plugin");
const isomorphicConfig = require("isomorphic-loader/lib/config");

module.exports = function(opts) {
  const archetype = archetypeConfig();
  const { babel } = archetype;
  const target = babel.target !== "default" ? `-${babel.target}` : "";
  const configFile = Path.resolve(isomorphicConfig.configFile.replace(".json", `${target}.json`));
  return {
    plugins: [
      new IsomorphicLoaderPlugin({
        configFile,
        assetsFile: opts.assetsFile || "../isomorphic-assets.json",
        webpackDev: {
          url: `http://${archetype.webpack.devHostname}:${archetype.webpack.devPort}`,
          addUrl: false
        }
      })
    ]
  };
};
