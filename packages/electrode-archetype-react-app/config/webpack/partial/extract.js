const mergeWebpackConfig = require("webpack-partial").default;

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const autoprefixer = require("autoprefixer-stylus");
const cssLoader = require.resolve("css-loader");
const styleLoader = require.resolve("style-loader");
const stylusLoader = require.resolve("stylus-loader");

module.exports = () => (config) => mergeWebpackConfig(config, {
  module: {
    loaders: [{
      name: "extract",
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract(styleLoader, `${cssLoader}!${stylusLoader}`)
    }]
  },
  stylus: {
    use: [autoprefixer({ browsers: ["last 2 versions"] })]
  },
  plugins: [new ExtractTextPlugin("style.[hash].css")]
});

