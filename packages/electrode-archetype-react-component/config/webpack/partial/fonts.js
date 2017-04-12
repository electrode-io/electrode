"use strict";

const archDevRequire = require("electrode-archetype-react-component-dev/require");
const urlLoader = archDevRequire.resolve("url-loader");
const fileLoader = archDevRequire.resolve("file-loader");

module.exports = function() {
  return {
    module: {
      rules: [{
          test: /\.woff(2)?$/i,
          loader: urlLoader + "?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.(ttf|eot)$/i,
          loader: fileLoader
        }
      ]
    }
  }
};
