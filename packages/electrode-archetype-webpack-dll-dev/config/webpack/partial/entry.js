"use strict";

const Path = require("path");

const { entry } = require(Path.resolve("."));

module.exports = {
  devtool: "source-map",
  entry
};
