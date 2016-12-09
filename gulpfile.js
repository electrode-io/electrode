"use strict";

const gulp = require("gulp");
const helper = require("electrode-gulp-helper");
const shell = helper.shell;
const exec = helper.exec;
const fs = require("fs");
const path = require("path");

helper.loadTasks({
  "test": {
    task: () => {
      const boilerplateDir = "./samples/universal-react-node";
      const localPkgs = ["electrode-archetype-react-app", "electrode-react-webapp", "electrode-redux-router-engine"];
      const localDevPkgs = ["electrode-archetype-react-app-dev"];
      const samplePkgFile = `${boilerplateDir}/package.json`;
      const samplePkg = require(samplePkgFile);

      function updateToLocalPkgs(pkgs, section) {
        pkgs.forEach((pkg) => {
          samplePkg[section][pkg] = `../../packages/${pkg}`;
        });
      }

      updateToLocalPkgs(localPkgs, "dependencies");
      updateToLocalPkgs(localDevPkgs, "devDependencies");
      fs.writeFileSync(samplePkgFile, JSON.stringify(samplePkg, null, 2));
      shell.pushd(boilerplateDir);
      return exec(`npm i`)
        .then(() => exec(`npm test`))
        .then(() => shell.popd())
        .catch((err) => {
          shell.popd();
          throw err;
        });
    }
  }
}, gulp);
