"use strict";

const assert = require("assert");
const xclap = require("xclap");
const xsh = require("xsh");
const shell = xsh.$;
const exec = xsh.exec;
const fs = require("fs");
const Path = require("path");
const yoTest = require("yeoman-test");
const _ = require("lodash");

const isWin32 = process.platform.startsWith("win32");
const packagesDir = Path.join(__dirname, "packages");

const pullLocalPackages = dir => {
  dir = Path.isAbsolute(dir) ? dir : Path.join(__dirname, dir);
  const localPkgs = [
    "electrode-archetype-react-app",
    "electrode-react-webapp",
    "electrode-redux-router-engine",
    "electrode-auto-ssr"
  ];
  const localDevPkgs = ["electrode-archetype-react-app-dev"];
  const localPackagesDir = Path.relative(dir, packagesDir);

  const updateToLocalPkgs = (pkgSection, pkgs) => {
    if (pkgSection) {
      pkgs.forEach(pkg => {
        if (pkgSection[pkg]) {
          pkgSection[pkg] = Path.join(localPackagesDir, pkg);
        }
      });
    }
  };

  const appPkgFile = Path.join(dir, "package.json");
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

  const restore = () => {
    if (appPkgData) {
      const appPkgFile = Path.join(dir, "package.json");
      fs.writeFileSync(appPkgFile, appPkgData);
    }
  };

  const localClap = Path.join("node_modules", ".bin", "clap");
  return exec({ cwd: dir }, `fyn --pg simple -q v i && ${localClap} ?fix-generator-eslint`).then(
    () => exec({ cwd: dir }, `${fynSetup} && npm test`)
  );
};

const testGenerator = (testDir, clean, prompts) => {
  const yoApp = Path.join(packagesDir, "generator-electrode/generators/app/index.js");
  const defaultPrompts = {
    name: "test-app",
    description: "test test",
    homepage: "http://test",
    serverType: "HapiJS",
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
    .then(() => {
      return runAppTest(Path.join(testDir, "test-app"), true);
    });
};

let fynSetup = false;

xclap.load({
  ".fyn-setup": () => {
    if (fynSetup) return undefined;
    fynSetup = true;
    return exec(true, "fyn json").then(r => {
      process.env.NODE_PRESERVE_SYMLINKS = 1;
      const fynEnv = JSON.parse(r.stdout);
      if (fynEnv.error) {
        console.log(".fyn-setup:", fynEnv.error);
      } else {
        process.env.NODE_OPTIONS = fynEnv.NODE_OPTIONS;
        console.log("NODE_OPTIONS set to", fynEnv.NODE_OPTIONS);
      }
    });
  },
  ".lerna.test": "~$lerna run test --ignore=electrode-webpack-reporter",
  "test-reporter": [".fyn-setup", ".test-reporter"],
  ".test-reporter": {
    task: () => {
      return exec(true, "lerna updated")
        .then(r => {
          if (r.stdout.indexOf("electrode-webpack-reporter") >= 0) {
            return `~$cd packages/electrode-webpack-reporter && fyn --pg none install && npm test`;
          }
        })
        .catch(err => {
          assert(
            err.output.stderr.indexOf("lerna info No packages need updating") > 0,
            ".test-reporter: lerna updated failed without 'No packages need updating' message"
          );
        });
    }
  },
  bootstrap: "~$fynpo",
  test: [".fyn-setup", "bootstrap", ".lerna.test", "test-reporter", "build-test"],
  "test-generator": [".fyn-setup", ".test-generator"],
  "test-demo-component": [
    ".fyn-setup",
    `~$cd samples/demo-component && fyn --pg none install && npm test`
  ],
  "test-boilerplate": [".fyn-setup", ".test-boilerplate"],
  "update-changelog": [".fyn-setup", "~$node tools/update-changelog.js"],
  "gitbook-serve": [".fyn-setup", "~$gitbook serve --no-watch --no-live"],
  "build-test": {
    desc: "Run CI test",
    task: () => {
      process.env.BUILD_TEST = "true";
      process.env.NODE_PRESERVE_SYMLINKS = "1";
      const tasks = ["test-boilerplate"];
      let updated;
      return exec("lerna updated")
        .then(output => {
          updated = output.stdout
            .split("\n")
            .filter(x => x.startsWith("- "))
            .map(x => x.substr(2));

          if (updated.indexOf("generator-electrode") >= 0) {
            tasks.push("test-generator");
          }

          if (updated.indexOf("electrode-archetype-react-component") >= 0) {
            tasks.push("test-demo-component");
          }

          return tasks;
        })
        .catch(err => {
          if (err.output.stderr.indexOf("No packages need updating") < 0) {
            throw err;
          }
        });
    }
  },

  ".test-boilerplate": {
    desc: "Run tests for the boilerplage app universal-react-node",
    task: () => {
      return runAppTest(Path.join(__dirname, "samples/universal-react-node"));
    }
  },

  "samples-local": {
    desc: "modify all samples to pull electrode packages from local",
    task: () => {
      ["electrode-demo-index", "universal-material-ui", "universal-react-node"].forEach(a => {
        pullLocalPackages(Path.join(__dirname, "samples", a));
      });
    }
  },

  ".test-generator": {
    desc: "Run tests for the yeoman generators",
    task: () => {
      const testDir = Path.join(__dirname, "tmp");
      return testGenerator(testDir, true, { serverType: "HapiJS" })
        .then(() => {
          const appFiles = ["package.json", "client", "config", "server", "test"];
          shell.rm("-rf", appFiles.map(x => Path.join(testDir, "test-app", x)));
        })
        .then(() => testGenerator(testDir, false, { serverType: "ExpressJS" }));
    }
  }
});
