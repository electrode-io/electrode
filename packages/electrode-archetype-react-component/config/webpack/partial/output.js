"use strict";

const Path = require("path");

module.exports = {
  output: {
    path: Path.join(process.cwd(), "dist"),
    filename: "bundle.min.js",
    libraryTarget: "umd"
  }
};
