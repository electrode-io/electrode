/**
 * SubApp version 2 support
 */

import { SubAppWebpackPlugin } from "../plugins/subapp-plugin";
import { JsonpScriptSrcPlugin } from "../plugins/jsonp-script-src-plugin";

module.exports = function(opts) {
  return {
    plugins: [
      new SubAppWebpackPlugin({
        webpackVersion: 4,
        assetsFile: "../subapps.json"
      }),
      new JsonpScriptSrcPlugin()
    ]
  };
};
