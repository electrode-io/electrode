"use strict";
const Terser = require("terser-webpack-plugin-legacy");
const archetype = require("electrode-archetype-react-app/config/archetype");

module.exports = function() {
  // Allow env var to disable minifcation for inspectpack usage.
  if (
    process.env.INSPECTPACK_DEBUG === "true" ||
    !archetype.webpack.minify ||
    archetype.webpack.minifier !== "terser"
  ) {
    return {};
  }

  const terserPlugin = new Terser({
    test: /\.js(\?.*)?$/i,
    extractComments: /^\**!|^ [0-9]+ $|@preserve|@license/
  });

  return {
    plugins: [terserPlugin]
  };
};
