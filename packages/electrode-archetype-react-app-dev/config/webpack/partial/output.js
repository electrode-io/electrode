"use strict";

const Path = require("path");
const inspectpack = process.env.INSPECTPACK_DEBUG === "true";
const envTargets = JSON.parse(process.env.ENV_TARGETS);

module.exports = {
  output: {
    path: Path.resolve(envTargets.default ? "dist" : `dist-${Object.keys(envTargets)[0]}`, "js"),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: "[name].js",
    filename: "[name].bundle.js"
  }
};
