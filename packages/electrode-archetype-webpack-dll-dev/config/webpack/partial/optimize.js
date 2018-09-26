"use strict";

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { production } = require("../util/context");

module.exports = () => {
  return {
    plugins: production
      ? [
          new UglifyJSPlugin({
            sourceMap: true,
            comments: /^\**!|^ [0-9]+ $|@preserve|@license/
          })
        ]
      : []
  };
};
