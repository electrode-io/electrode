"use strict";

const Path = require("path");

module.exports = {
  output: {
    path: Path.resolve("dll/js"),
    filename: "[name].bundle.[hash].js",
    library: "[name]_[hash]"
  }
};
