"use strict";

const archDevRequire = require("electrode-archetype-react-component-dev/require");
const optimize = archDevRequire("webpack").optimize;
const LodashModuleReplacementPlugin = archDevRequire("lodash-webpack-plugin");

module.exports = function(){
  return {
    plugins: [
      new LodashModuleReplacementPlugin(),
      new optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      })
    ]
  };
};
