/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";
const webpack = require("webpack");
import { loadXarcOptions } from "../util/load-xarc-options";

module.exports = function() {
  const xarcOptions = loadXarcOptions();
  const xarcCwd = xarcOptions.cwd;

  return {
    plugins: [
      new webpack.DllPlugin({
        name: "[name]_[hash]",
        path: Path.resolve(xarcCwd, "dll/js/[name]-manifest.[hash].json")
      })
    ]
  };
};
