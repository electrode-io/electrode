const Path = require("path");

const repoPackagesDir = Path.join(__dirname, "../../../../packages");

module.exports = {
  resolve: {
    alias: {
      "demo-component": Path.join(repoPackagesDir, "demo-component/demo/demo.jsx"),
      "demo-component-style": Path.join(repoPackagesDir, "demo-component/demo/demo.css"),
      react: Path.dirname(require.resolve("react/package.json")),
      "react-dom": Path.dirname(require.resolve("react-dom/package.json"))
    },
    modules: [
      Path.resolve("node_modules"),
      Path.join(repoPackagesDir, "demo-component"),
      Path.join(repoPackagesDir, "demo-component/node_modules")
    ]
  }
};
