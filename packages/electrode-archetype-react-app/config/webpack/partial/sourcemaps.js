const mergeWebpackConfig = require("webpack-partial").default;
const SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;

module.exports = () => (config) => mergeWebpackConfig(config, {
  plugins: [
    // TODO: switch to internal sourcemaps server.
    // https://gecgithub01.walmart.com/electrode/electrode-archetype-react-app/issues/39
    new SourceMapDevToolPlugin(
      "../map/bundle.[hash].js.map",
      "\n//# sourceMappingURL=http://127.0.0.1:3001/dist/map/[url]"
    )
  ]
});
