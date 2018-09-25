"use strict";

const webpack = require("webpack");
const Path = require("path");
const { context, tag } = require("../util/context");

module.exports = {
  plugins: [
    new webpack.DllPlugin({
      path: Path.join(context, `dll_[name]-manifest${tag}.json`),
      name: "dll_[name]"
    })
  ]
};
