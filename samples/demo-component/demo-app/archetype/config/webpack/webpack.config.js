console.log("oops");
const Path = require("path");

const repoPackagesDir = Path.join(__dirname, "../../../../packages");

module.exports = {
  resolve: {
    alias: {
      "demo-component": Path.join(repoPackagesDir, "demo-component/src")
    },
    modules: [
      Path.join(repoPackagesDir, "demo-component"),
      Path.join(repoPackagesDir, "demo-component/node_modules")
    ]
  }
};
