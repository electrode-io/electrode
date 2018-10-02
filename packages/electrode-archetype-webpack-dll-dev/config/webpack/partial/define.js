"use strict";

const webpack = require("webpack");
const { production } = require("../util/context");

module.exports = {
  plugins: production
    ? [
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("production")
        })
      ]
    : []
};
