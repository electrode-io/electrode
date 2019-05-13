const TerserPlugin = require("terser-webpack-plugin-legacy");

const isProduction = process.env.NODE_ENV === "production";

const plugins = [];

module.exports = function() {

  if (isProduction) {
    return {
      plugins: [
        ...plugins,
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          extractComments: /^\**!|^ [0-9]+ $|@preserve|@license/
        })
      ]
    };
  } else {
    
    return {
      plugins: [...plugins]
    };
  }
};
