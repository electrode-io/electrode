/* eslint-disable @typescript-eslint/no-var-requires */

import * as Path from "path";
const webpack = require("webpack");

module.exports = function() {
  return {
    plugins: [
      new webpack.DllPlugin({
        name: "[name]_[hash]",
        path: Path.resolve("dll/js/[name]-manifest.[hash].json")
      })
    ]
  };
};
