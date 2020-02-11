"use strict";

const optionalRequire = require("optional-require")(require);
const devRequire =
  process.env.NODE_ENV !== "production" && optionalRequire("@xarc/app-dev/require");

const winstonLogger = require("./winston-logger");

module.exports = devRequire ? winstonLogger(devRequire("winston")) : require("./console-logger");
