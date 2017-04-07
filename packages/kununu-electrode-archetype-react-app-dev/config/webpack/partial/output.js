"use strict";

const Path = require("path");

const inspectpack = process.env.INSPECTPACK_DEBUG === "true";

module.exports = {
  output: {
    path: Path.resolve("dist", "js"),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: "[hash].[name].js",
    filename: "[name].bundle.[hash].js"
  }
};
