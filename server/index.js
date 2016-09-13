"use strict";

process.on("SIGINT", () => {
  process.exit(0);
});

const config = require("electrode-confippet").config;
const staticPathsDecor = require("electrode-static-paths");

require("babel-register")({
  ignore: /node_modules\/(?!react\/)/
});

require("electrode-server")(config, [staticPathsDecor()]);
