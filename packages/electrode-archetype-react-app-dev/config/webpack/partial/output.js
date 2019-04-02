"use strict";

const Path = require("path");
const { babel } = require("electrode-archetype-react-app/config/archetype");
const inspectpack = process.env.INSPECTPACK_DEBUG === "true";
const { target, envTargets } = babel;
const hasOtherTargets =
  Object.keys(envTargets).sort().join(",") !== "default,node";

module.exports = {
  output: {
    path: Path.resolve(target !== "default" ? `dist-${target}` : "dist", "js"),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: hasOtherTargets ? `${target}.[hash].[name].js` : "[hash].[name].js",
    filename: hasOtherTargets ? `${target}.[name].bundle.js` : "[name].bundle.[hash].js"
  }
};
