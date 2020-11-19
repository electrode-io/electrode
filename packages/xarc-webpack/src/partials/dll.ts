/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";
const webpack = require("webpack");
import { loadXarcOptions } from "../util/load-xarc-options";
const { detectXARCPath } = require("@xarc/app-dev/lib/utils");
const xarcOptions = loadXarcOptions();
const xarcPath = detectXARCPath(xarcOptions.XARC_CWD);
module.exports = function() {
  return {
    plugins: [
      new webpack.DllPlugin({
        name: "[name]_[hash]",
        path: Path.resolve(xarcPath,"dll/js/[name]-manifest.[hash].json")
      })
    ]
  };
};
