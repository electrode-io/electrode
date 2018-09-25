"use strict";

const Path = require("path");

const production = () => process.env.NODE_ENV === "production";

module.exports = {
  context: Path.resolve("dist"),
  tag: production() ? "" : ".dev"
};

Object.defineProperty(module.exports, "production", {
  get: () => production()
});
