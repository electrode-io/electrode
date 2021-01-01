/* eslint-disable */

const { register } = require("ts-node");
const tsConfigFile = [`../tsconfig`, process.env.TS_CONFIG_ENV || "node.cjs", "json"]
  .filter(x => x)
  .join(".");
const tsConfig = require(tsConfigFile);
register(tsConfig);
