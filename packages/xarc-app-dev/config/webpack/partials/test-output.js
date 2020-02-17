"use strict";

module.exports = () => ({
  output: {
    path: process.cwd(),
    filename: "[name].bundle.js",
    publicPath: "/assets/"
  }
});
