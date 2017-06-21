"use strict";

const optionalRequire = require("optional-require")(require);
const devRequire = optionalRequire("electrode-archetype-react-app-dev/require");

const winstonLogger = require("./winston-logger");

module.exports = devRequire ? winstonLogger(devRequire("winston")) : require("./console-logger");
