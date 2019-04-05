"use strict";

const Path = require("path");
const { babel } = require("electrode-archetype-react-app/config/archetype");
const hasMultiTargets = require("../util/detect-multi-targets");
const inspectpack = process.env.INSPECTPACK_DEBUG === "true";
const { target } = babel;
const hasOtherTargets = hasMultiTargets();

module.exports = {
  output: {
    path: Path.resolve(target !== "default" ? `dist-${target}` : "dist", "js"),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: hasOtherTargets ? `${target}.[hash].[name].js` : "[hash].[name].js",
    filename: hasOtherTargets ? `${target}.[name].bundle.js` : "[name].bundle.[hash].js"
  }
};
