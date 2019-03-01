"use strict";

const Path = require("path");
const { AppMode } = require("electrode-archetype-react-app/config/archetype");
const inspectpack = process.env.INSPECTPACK_DEBUG === "true";
const { ENV_TARGETS } = process.env;

module.exports = {
  output: {
    path: Path.resolve(ENV_TARGETS === "default" ? "dist" : `dist-${ENV_TARGETS}`, "js"),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: "[hash].[name].js",
    filename: AppMode.hasSubApps ? "[name].bundle.js" : "[name].bundle.[hash].js"
  }
};
