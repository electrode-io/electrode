const { AppMode } = require("electrode-archetype-react-app/config/archetype");

const config = {};

if (AppMode.hasSubApps) {
  // use webpack splitChunks optimization to automatically put modules
  // shared by subapps into common bundles.
  // The common bundles will be determined by the splitChunks parameters.
  // The filename has the pattern of hex-sum.bundle1~bundle2~bundle#.js
  // https://webpack.js.org/plugins/split-chunks-plugin/
  config.optimization = {
    splitChunks: {
      chunks: "all"
      // minSize: 1 * 1024,
      // maxSize: 200 * 1024
    }
  };
}

module.exports = config;
