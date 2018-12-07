"use strict";

const Path = require("path");

module.exports = {
  output: {
    path: Path.resolve("dist"),
    filename: "bundle.min.js",
    libraryTarget: "umd"
  }
};
