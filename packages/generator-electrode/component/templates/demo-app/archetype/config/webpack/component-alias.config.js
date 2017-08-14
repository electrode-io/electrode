"use strict";

const Path = require("path");

const repoPackagesDir = Path.join(__dirname, "../../../../packages");

const Fs = require("fs");

const components = Fs.readdirSync(repoPackagesDir);

const config = {
  resolve: {
    alias: {}
  },
  modules: []
};

components.forEach(name => {
  config.resolve.alias[name] = Path.join(repoPackagesDir, name, "src");
  config.modules.push(Path.join(repoPackagesDir, name));
  config.modules.push(Path.join(repoPackagesDir, name, "node_modules"));
});

module.exports = config;
