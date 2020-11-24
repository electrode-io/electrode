/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable max-statements */

//
// Check config archetype.webpack.loadDlls
//
// - If it's not empty, then each entry is name of an Electrode Webpack DLL
//   module to be loaded by the app.
//
// - Archetype will make sure:
//   - When in local dev mode, then DLL assets are made available through localhost.
//   - When in prod mode, then DLL assets are load with CDN URLs in cdn-mapping.json
//   - Source map properly made available
//
// This is similar to the dll-reference partial, except it's meant to work with
// the newer Electrode Webpack DLL modules.
//

import * as webpack from "webpack";
const DonePlugin = require("../plugins/done-plugin");
const dllUtil = require("../util/dll-util");
const _ = require("lodash");
import { loadXarcOptions } from "../util/load-xarc-options";

module.exports = function() {
  const dll = dllUtil.loadAssets();
  const xarcOptions = loadXarcOptions();
  const xarcCwd = xarcOptions.cwd;

  // no DLL
  if (_.isEmpty(dll.assets)) {
    return {};
  }

  // dev mode?
  if (process.env.WEBPACK_DEV === "true") {
    dllUtil.updateDllAssetsForDev(dll.assets);
  }

  return {
    plugins: dll.info
      .map(info => {
        return new webpack.DllReferencePlugin({
          context: xarcCwd,
          manifest: dllUtil.loadJson(info.manifest)
        });
      })
      .concat(new DonePlugin(() => dllUtil.saveDllAssets(dll.assets)))
  };
};
