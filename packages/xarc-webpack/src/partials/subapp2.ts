/**
 * SubApp version 2 support
 */

import { SubAppWebpackPlugin } from "../plugins/subapp-plugin";
import { JsonpScriptSrcPlugin } from "../plugins/jsonp-script-src-plugin";

module.exports = function(opts) {
  return {
    optimization: {
      // TODO: always generating runtime chunk could break apps that doesn't
      // check and load it.  don't do this for now.
      // runtimeChunk: "single"
    },
    plugins: [
      new SubAppWebpackPlugin({
        // let plugin figure out webpack version
        // webpackVersion: 4,
        assetsFile: "../subapps.json"
      }),
      new JsonpScriptSrcPlugin()
    ]
  };
};
