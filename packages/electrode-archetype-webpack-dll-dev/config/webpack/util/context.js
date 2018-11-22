"use strict";

const Path = require("path");

const production = () => process.env.NODE_ENV === "production";

module.exports = {
  context: Path.resolve("dist")
};

Object.defineProperty(module.exports, "production", {
  get: () => production()
});

Object.defineProperty(module.exports, "tag", {
  get: () => (production() ? "" : ".dev")
});

Object.defineProperty(module.exports, "mode", {
  get: () => (production() ? "production" : "development")
});
