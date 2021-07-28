// Custom Webpack Config that takes control and overrides Archetype
const { xarcWebpack } = require("@xarc/app-dev");
const WebpackHookPlugin = require("webpack-hook-plugin");

const env = xarcWebpack.getEnvProfile();
const options = xarcWebpack.getComposeOptions();
// An example to add a plugin
const wConfig = xarcWebpack.compose(options);

if (env === "development") {
  const webpackHook = new WebpackHookPlugin({
    onBuildStart: ['echo "Webpack Build starts"'],
    onBuildEnd: ['echo "Webpack Build ends"'],
  });

  wConfig.plugins.push(webpackHook);
}

module.exports = wConfig;
