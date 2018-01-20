const Path = require("path");

const repoPackagesDir = Path.join(__dirname, "../../../../packages");

module.exports = {
  resolve: {
    alias: {
      "demo-component": Path.join(repoPackagesDir, "demo-component/src"),
      "react": Path.resolve(__dirname, "../../../node_modules", "react"),
      "react-dom": Path.resolve(__dirname, "../../../node_modules", "react-dom")
    },
    modules: [
      Path.join(repoPackagesDir, "demo-component"),
      Path.join(repoPackagesDir, "demo-component/node_modules")
    ]
  }
};
