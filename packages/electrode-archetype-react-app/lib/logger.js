const archetype = require("../config/archetype");
const devRequire = archetype.devRequire;

const winstonLogger = require("./winston-logger");

module.exports = devRequire ? winstonLogger(devRequire("winston")) : require("./console-logger");
