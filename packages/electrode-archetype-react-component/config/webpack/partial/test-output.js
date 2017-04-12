"use strict";

module.exports = function() {
  return {
    output: {
      path: process.cwd(),
      filename: "bundle.js",
      publicPath: "/assets/"
    }
  };
};
