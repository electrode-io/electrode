"use strict";

const Path = require("path");
const { AppMode, babel } = require("electrode-archetype-react-app/config/archetype");
const inspectpack = process.env.INSPECTPACK_DEBUG === "true";
const { target } = babel;
const filename = (() => {
  let _filename = "[name].bundle.[hash].js";
  if (AppMode.hasSubApps) {
    _filename = "[name].bundle.js";
  } else if (target !== "default") {
    _filename = `${target}-[name].bundle.[hash].js`
  }
  return _filename;
})();

module.exports = {
  output: {
    path: Path.resolve(target !== "default" ? `dist-${target}` : "dist", "js"),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: target !== "default" ? `${target}.[hash].[name].js` : "[hash].[name].js",
    filename
  }
};
