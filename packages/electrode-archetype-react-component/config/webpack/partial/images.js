"use strict";

const archDevRequire = require("electrode-archetype-react-component-dev/require");
const urlLoader = archDevRequire.resolve("url-loader");

module.exports = function() {
  return {
    module: {
      rules: [{
        test: /\.(png|jpg|svg|gif)$/,
        loader: urlLoader
      }]
    }
  }
};
