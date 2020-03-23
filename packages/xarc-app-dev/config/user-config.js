"use strict";

const Path = require("path");
const { merge } = require("lodash")

const optionalRequire = require("optional-require")(require);
module.exports = merge({ options: {} }, optionalRequire(Path.resolve("archetype/config")));
