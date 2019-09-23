// Custom Webpack Config that takes control and overrides Archetype
const { compose, env, options } = require("electrode-archetype-react-app-dev/config/webpack");
const WebpackHookPlugin = require("webpack-hook-plugin");

// An example to add a plugin
const wConfig = compose(options);

if (env === "development") {
  const webpackHook = new WebpackHookPlugin({
    onBuildStart: ['echo "Webpack Build starts"'],
    onBuildEnd: ['echo "Webpack Build ends"']
  });

  wConfig.plugins.push(webpackHook);
}

module.exports = wConfig;
