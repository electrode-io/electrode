const Path = require("path");

const repoPackagesDir = Path.join(__dirname, "../../../../packages");

module.exports = {
  resolve: {
    alias: {
      "react": Path.dirname(require.resolve("react/package.json")),
      "react-dom": Path.dirname(require.resolve("react-dom/package.json")),
      "demo-component": Path.dirname(require.resolve("demo-component/__fv_/1.0.0-fynlocal9441882fee2cabcb69d3498feb85dcf0/demo-component/package.json"))
    },
    modules: [
      Path.resolve("node_modules"),
      Path.join(repoPackagesDir, "demo-component"),
      Path.join(repoPackagesDir, "demo-component/node_modules")
    ]
  }
};
