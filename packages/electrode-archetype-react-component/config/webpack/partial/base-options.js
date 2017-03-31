"use strict";

var archDevRequire = require("electrode-archetype-react-component-dev/require");
var webpack = archDevRequire("webpack");

module.exports = function() {
  return {
    cache: true,
    plugins: [
     new webpack.LoaderOptionsPlugin({
       debug: false
     })
    ]
  };
};
