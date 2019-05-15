"use strict";
const Terser = require("terser-webpack-plugin-legacy");

module.exports = function() {

  const terserPlugin = new Terser({
    test: /\.js(\?.*)?$/i,
    extractComments: /^\**!|^ [0-9]+ $|@preserve|@license/
  });

  return {
    plugins: [terserPlugin]
  };
};
