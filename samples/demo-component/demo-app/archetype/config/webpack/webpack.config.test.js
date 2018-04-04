const Path = require("path");

const repoPackagesDir = Path.join(__dirname, "../../../../packages");

module.exports = {
  resolve: {
    alias: {
      "react": Path.dirname(require.resolve("react/package.json")),
      "react-dom": Path.dirname(require.resolve("react-dom/package.json")),
      "demo-component": Path.join(repoPackagesDir, "demo-component")
    },
    modules: [
      Path.resolve("node_modules"),
      Path.join(repoPackagesDir, "demo-component"),
      Path.join(repoPackagesDir, "demo-component/node_modules")
    ]
  }
};
