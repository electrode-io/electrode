"use strict";

const gulp = require("gulp");
const helper = require("electrode-gulp-helper");
const shell = helper.shell;
const exec = helper.exec;
const fs = require("fs");
const path = require("path");
const yoTest = require("yeoman-test");
const _ = require("lodash");

const packagesDir = path.resolve("packages");

const runAppTest = (dir, forceLocal) => {
  const localPkgs = ["electrode-archetype-react-app", "electrode-react-webapp", "electrode-redux-router-engine"];
  const localDevPkgs = ["electrode-archetype-react-app-dev"];
  const appPkgFile = `${dir}/package.json`;
  const appPkg = JSON.parse(fs.readFileSync(appPkgFile).toString());

  function updateToLocalPkgs(pkgs, section) {
    const pkgSection = appPkg[section];
    if (pkgSection) {
      pkgs.forEach((pkg) => {
        if (pkgSection[pkg]) {
          pkgSection[pkg] = path.join(packagesDir, pkg);
        }
      });
    }
  }

  if (forceLocal || process.env.BUILD_TEST) {
    updateToLocalPkgs(localPkgs, "dependencies");
    updateToLocalPkgs(localDevPkgs, "devDependencies");
  }

  fs.writeFileSync(appPkgFile, JSON.stringify(appPkg, null, 2));
  shell.pushd(dir);
  return exec(`npm i`)
    .then(() => exec(`npm test`))
    .then(() => shell.popd())
    .catch((err) => {
      shell.popd();
      throw err;
    });
};

const testGenerator = (testDir, clean, prompts) => {
  const yoApp = path.join(packagesDir, ("generator-electrode/generators/app/index.js"));
  const defaultPrompts = {
    name: "test-app",
    description: "test test",
    homepage: "http://test",
    serverType: "ExpressJS",
    authorName: "John Smith",
    authorEmail: "john@smith.com",
    authorUrl: "http://www.test.com",
    keywords: ["test", "electrode"],
    pwa: true,
    createDirectory: true,
    githubAccount: "test",
    license: "Apache-2.0"
  };
  prompts = _.extend({}, defaultPrompts, prompts || {});

  const yoRun = yoTest.run(yoApp);
  return (clean ? yoRun.inDir(testDir) : yoRun.cd(testDir))
    .withOptions({
      "skip-install": true
    })
    .withPrompts(prompts)
    .then(() => runAppTest(path.join(testDir, "test-app"), true));
};

helper.loadTasks({
  "build-test": {
    task: () => {
      process.env.BUILD_TEST = "true";
      let updated;
      return exec("lerna updated")
        .then((output) => {
          updated = output.stdout.split("\n").filter((x) => x.startsWith("- ")).map((x) => x.substr(2));
        })
        .then(() => {
          if (updated.indexOf("generator-electrode")) {
            return exec("gulp test-generator");
          }
        })
        .then(() => exec("gulp test-boilerplate"));
    }
  },

  "test-boilerplate": {
    task: () => runAppTest(path.resolve("samples/universal-react-node"))
  },

  "test-generator": {
    task: () => {
      const testDir = path.resolve("tmp");
      return testGenerator(testDir, true, {serverType: "ExpressJS"})
        .then(() => {
          const appFiles = ["package.json", "client", "config", "server", "test"];
          shell.rm("-rf", appFiles.map((x) => path.join(testDir, "test-app", x)));
        })
        .then(() => testGenerator(testDir, false, {serverType: "HapiJS"}));
    }
  }
}, gulp);
