const assert = require("assert");
const envOpts = { modules: "auto" };

const config = {};

const babelEnv = process.env.BABEL_ENV || "";

assert(babelEnv, "env BABEL_ENV must be defined");

if (babelEnv.includes("-node")) {
  Object.assign(envOpts, { modules: "auto", targets: { node: "10" } });
} else {
  Object.assign(envOpts, { modules: false, useBuiltIns: "entry", corejs: 3, targets: { ie: "8" } });
  config.plugins = [
    [
      "@babel/transform-runtime",
      {
        helpers: true,
        regenerator: false,
        version: "7.8.3"
      }
    ]
  ];
}

const presets = [["@babel/env", envOpts], "@babel/react"];

if (babelEnv.includes("-minify")) {
  presets.push(["minify", {
    "keepFnName": false,
  }]);
}

Object.assign(config, { presets });

module.exports = config;
