"use strict";

const Path = require("path");
const { AppMode, babel } = require("electrode-archetype-react-app/config/archetype");
const inspectpack = process.env.INSPECTPACK_DEBUG === "true";
const { target, envTargets } = babel;
const hasOtherTargets =
  Object.keys(envTargets).filter(x => x !== "default" && x !== "node").length > 0;

const filename = (() => {
  let _filename = "[name].bundle.[hash].js";
  if (AppMode.hasSubApps) {
    _filename = "[name].bundle.js";
  } else if (hasOtherTargets) {
    _filename = `${target}.[name].bundle.js`;
  }
  return _filename;
})();

module.exports = {
  output: {
    path: Path.resolve(target !== "default" ? `dist-${target}` : "dist", "js"),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: hasOtherTargets ? `${target}.[hash].[name].js` : "[hash].[name].js",
    filename
  }
};
