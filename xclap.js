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

const removeNpmScope = name => {
  if (name.startsWith("@")) {
    const parts = name.split("/");
    if (parts.length === 2) {
      if (parts[1] === "create-app") {
        return parts[1];
      }
      return parts[0].substr(1) + "-" + parts[1];
    }
  }

  return name;
};

const pullLocalPackages = dir => {
  dir = Path.isAbsolute(dir) ? dir : Path.join(__dirname, dir);
  const localPkgs = [
    "@xarc/app",
    "electrode-react-webapp",
    "electrode-redux-router-engine",
    "electrode-auto-ssr",
    "electrode-cookies",
    "electrode-ui-config",
    "subapp-redux",
    "subapp-server",
    "subapp-web"
  ];
  const localDevPkgs = ["@xarc/app-dev"];
  const localPackagesDir = Path.relative(dir, packagesDir);

  const appPkgFile = Path.join(dir, "package.json");
  const appPkgData = fs.readFileSync(appPkgFile).toString();
  const appPkg = JSON.parse(appPkgData);

  const updateToLocalPkgs = (section, pkgs) => {
    if (appPkg[section]) {
      pkgs.forEach(pkg => {
        if (appPkg[section][pkg]) {
          _.set(
            appPkg,
            ["fyn", section, pkg],
            Path.join(localPackagesDir, removeNpmScope(pkg)).replace(/\\/g, "/")
          );
        }
      });
    }
  };

  updateToLocalPkgs("dependencies", localPkgs);
  updateToLocalPkgs("devDependencies", localDevPkgs);
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
  return exec({ cwd: dir }, `fyn --pg simple -q v i`)
    .then(() => exec({ cwd: dir }, `npm test`))
    .then(() => exec({ cwd: dir }, `${localClap} -n build`));
};

const testCreateApp = async (testDir, name, clean, runTest, prompts) => {
  name = name || "my-app";
  const testAppDir = Path.join(testDir, name);

  if (!clean) {
    shell.mkdir("-p", testAppDir);
  }

  shell.pushd(testAppDir);
  await require("./packages/create-app/src/create")();
  shell.popd();
};

xclap.load({
  ".lerna.coverage": "~$lerna run --stream coverage",
  bootstrap: "~$fynpo",
  test: ["bootstrap", ".lerna.coverage", "build-test"],
  "test-create-app": [".test-create-app"],
  "test-boilerplate": [".test-boilerplate"],
  "test-stylus-sample": [".test-stylus-sample"],
  "update-changelog": ["~$node tools/update-changelog.js"],
  "gitbook-serve": ["~$gitbook serve --no-watch --no-live"],
  "build-test": {
    desc: "Run CI test",
    task: () => {
      process.env.BUILD_TEST = "true";
      process.env.NODE_PRESERVE_SYMLINKS = "1";
      const tasks = ["test-boilerplate", "test-stylus-sample", ".test-jest-sample"];
      let updated;
      return exec("lerna updated")
        .then(output => {
          updated = output.stdout
            .split("\n")
            .filter(x => x.startsWith("- "))
            .map(x => x.substr(2));

          const updatedStr = updated.join(" ");

          if (updatedStr.indexOf("@xarc/app") >= 0) {
            tasks.push([".", ".build-react-component", ".test-tree-shaking"]);
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

  ".build-sample-dll": () => {
    return runAppTest(Path.join(__dirname, "samples/react-vendor-dll"));
  },

  ".build-react-component": () => {
    return runAppTest(Path.join(__dirname, "samples/react-component"));
  },

  ".test-boilerplate": {
    desc: "Run tests for the boilerplage app universal-react-node",
    dep: [".build-sample-dll"],
    task: () => {
      return runAppTest(Path.join(__dirname, "samples/universal-react-node"));
    }
  },

  ".test-tree-shaking": {
    desc: "Run tests for the demo-tree-shaking sample app",
    task: () => {
      return runAppTest(Path.join(__dirname, "samples/demo-tree-shaking"));
    }
  },

  ".test-stylus-sample": {
    desc: "Run tests for the boilerplage app stylus-sample",
    task: () => {
      return runAppTest(Path.join(__dirname, "samples/stylus-sample"));
    }
  },

  ".test-jest-sample": {
    desc: "Run tests for the boilerplage app react-jest-app",
    task: () => {
      return runAppTest(Path.join(__dirname, "samples/react-jest-app"));
    }
  },

  "samples-local": {
    desc: "modify all samples to pull electrode packages from local",
    task: () => {
      [
        "electrode-demo-index",
        "stylus-sample",
        "universal-material-ui",
        "universal-react-node",
        "react-jest-app"
      ].forEach(a => {
        pullLocalPackages(Path.join(__dirname, "samples", a));
      });
    }
  },

  ".test-create-app": {
    async task() {
      const testDir = Path.join(__dirname, "tmp");
      await testCreateApp(testDir, "my-app");
      const testAppDir = Path.join(testDir, "my-app");
      pullLocalPackages(testAppDir);
    }
  }
});
