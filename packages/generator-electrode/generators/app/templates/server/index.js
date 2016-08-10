"use strict";
process.on('SIGINT', function () {
  process.exit(0);
});
require("babel-register")({
  ignore: /node_modules\/(?!react\/)/
});
const config = require("electrode-confippet").config;
require("electrode-server")(config);
