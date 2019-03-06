"use strict";

const Path = require("path");
const { AppMode } = require("electrode-archetype-react-app/config/archetype");
const inspectpack = process.env.INSPECTPACK_DEBUG === "true";
let { ENV_TARGET } = process.env;

ENV_TARGET = ENV_TARGET || "default";

module.exports = {
  output: {
    path: Path.resolve(ENV_TARGET !== "default" ? `dist-${ENV_TARGET}` : "dist", "js"),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: "[hash].[name].js",
    filename: AppMode.hasSubApps ? "[name].bundle.js" : "[name].bundle.[hash].js"
  }
};
