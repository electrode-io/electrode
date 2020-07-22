"use strict";

const archetype = require("@xarc/app-dev/config/archetype")();
const AppMode = archetype.AppMode;
const Path = require("path");
const clientDllConfig = require(Path.resolve(AppMode.src.client, "dll.config.js"));

module.exports = () => ({
  entry: clientDllConfig
});
