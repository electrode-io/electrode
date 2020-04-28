"use strict";
module.exports = function (api) {
  api.cache(true);
  const config = require("@xarc/app-dev/config/babel/babelrc.js");
  return { ...config };
};
