const Path = require("path");

const repoPackagesDir = Path.join(__dirname, "../../../../packages");

module.exports = {
  resolve: {
    alias: {
      "demo-component": Path.join(repoPackagesDir, "demo-component/src"),
      "react": Path.dirname(require.resolve("react/package.json")),
      "react-dom": Path.dirname(require.resolve("react-dom/package.json"))
    },
    modules: [
      Path.join(repoPackagesDir, "demo-component"),
      Path.join(repoPackagesDir, "demo-component/node_modules")
    ]
  }
};
