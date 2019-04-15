"use strict";

const Path = require("path");
const archetype = require("electrode-archetype-react-app/config/archetype");
const { AppMode, babel } = archetype;

const inspectpack = process.env.INSPECTPACK_DEBUG === "true";

const getOutputFilename = () => {
  let filename = "[name].bundle.[hash].js";

  if (AppMode.hasSubApps) {
    filename = "[name].bundle.js";
  } else if (babel.hasMultiTargets) {
    filename = `${babel.target}.[name].bundle.js`;
  }

  return filename;
};

const getOutputPath = () => {
  if (process.env.WEBPACK_DEV === "true") {
    return "/"; // simulate the behavior of webpack-dev-server, which sets output path to /
  } else {
    return Path.resolve(babel.target !== "default" ? `dist-${babel.target}` : "dist", "js");
  }
};

module.exports = {
  output: {
    path: getOutputPath(),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: babel.hasMultiTargets ? `${babel.target}.[hash].[name].js` : "[hash].[name].js",
    filename: getOutputFilename()
  }
};
