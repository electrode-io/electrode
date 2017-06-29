"use strict";

const xclap = require("xclap");
const xsh = require("xsh");
const shell = xsh.$;
const exec = xsh.exec;
const fs = require("fs");
const path = require("path");
const yoTest = require("yeoman-test");
const _ = require("lodash");

if (!process.env.PACKAGES_DIR) {
  process.env.PACKAGES_DIR = path.resolve("packages");
}

const pullLocalPackages = dir => {
  dir = path.resolve(dir);
  const localPkgs = [
    "electrode-archetype-react-app",
    "electrode-react-webapp",
    "electrode-redux-router-engine",
    "electrode-auto-ssr"
  ];
  const localDevPkgs = ["electrode-archetype-react-app-dev"];
  const localPackagesDir = path.relative(dir, process.env.PACKAGES_DIR);

  const updateToLocalPkgs = (pkgSection, pkgs) => {
    if (pkgSection) {
      pkgs.forEach(pkg => {
        if (pkgSection[pkg]) {
          pkgSection[pkg] = path.join(localPackagesDir, pkg);
        }
      });
    }
  };

  const appPkgFile = path.join(dir, "package.json");
  const appPkgData = fs.readFileSync(appPkgFile).toString();
  const appPkg = JSON.parse(appPkgData);
  updateToLocalPkgs(appPkg["dependencies"], localPkgs);
  updateToLocalPkgs(appPkg["devDependencies"], localDevPkgs);
  fs.writeFileSync(appPkgFile, `${JSON.stringify(appPkg, null, 2)}\n`);

  return appPkgData;
};

const runAppTest = (dir, forceLocal) => {
  const appPkgData =
    (forceLocal || process.env.BUILD_TEST || process.env.CI) && pullLocalPackages(dir);

  shell.pushd(dir);

  const restore = () => {
    shell.popd();
    if (appPkgData) {
      const appPkgFile = path.resolve(dir, "package.json");
      fs.writeFileSync(appPkgFile, appPkgData);
    }
  };

  return exec(`npm i`).then(() => exec(`npm test`)).then(restore).catch(err => {
    restore();
    throw err;
  });
};

const testGenerator = (testDir, clean, prompts) => {
  const yoApp = path.join(process.env.PACKAGES_DIR, "generator-electrode/generators/app/index.js");
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
    autoSsr: true,
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

xclap.load({
  "build-test": {
    desc: "Run CI test",
    task: () => {
      process.env.BUILD_TEST = "true";
      let updated;
      return exec("lerna updated")
        .then(output => {
          updated = output.stdout.split("\n").filter(x => x.startsWith("- ")).map(x => x.substr(2));
        })
        .then(() => {
          if (updated.indexOf("generator-electrode") >= 0) {
            return "test-generator";
          }
        })
        .then(() => "test-boilerplate")
        .catch(err => {
          if (err.output.stderr.indexOf("No packages need updating") < 0) {
            throw err;
          }
        });
    }
  },

  "test-boilerplate": {
    desc: "Run tests for the boilerplage app universal-react-node",
    task: () => runAppTest(path.resolve("samples/universal-react-node"))
  },

  "samples-local": {
    desc: "modify all samples to pull electrode packages from local",
    task: () => {
      ["electrode-demo-index", "universal-material-ui", "universal-react-node"].forEach(a => {
        pullLocalPackages(path.resolve("samples", a));
      });
    }
  },

  "test-generator": {
    desc: "Run tests for the yeoman generators",
    task: () => {
      const testDir = path.resolve("tmp");
      return testGenerator(testDir, true, { serverType: "ExpressJS" })
        .then(() => {
          const appFiles = ["package.json", "client", "config", "server", "test"];
          shell.rm("-rf", appFiles.map(x => path.join(testDir, "test-app", x)));
        })
        .then(() => testGenerator(testDir, false, { serverType: "HapiJS" }));
    }
  }
});
