"use strict";

const xrun = require("@xarc/run");
const xsh = require("xsh");
const shell = xsh.$;
const exec = xsh.exec;
const fs = require("fs");
const Path = require("path");
const _ = require("lodash");

const { spawn } = require("child_process");

const packagesDir = Path.join(__dirname, "packages");

const removeNpmScope = (name) => {
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

const pullLocalPackages = (dir) => {
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
    "subapp-web",
  ];
  const localDevPkgs = ["@xarc/app-dev"];
  const localPackagesDir = Path.relative(dir, packagesDir);

  const appPkgFile = Path.join(dir, "package.json");
  const appPkgData = fs.readFileSync(appPkgFile).toString();
  const appPkg = JSON.parse(appPkgData);

  const updateToLocalPkgs = (section, pkgs) => {
    if (appPkg[section]) {
      pkgs.forEach((pkg) => {
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
  return new Promise((resolve, reject) => {
    const child = spawn(
      `fyn`,
      `--pg simple -q=v i --run-npm build test --sl fyn-ci-${process.pid}.log`.split(" "),
      {
        cwd: dir,
        // somehow the stdout from fyn got chopped off by node.js, and the only way to
        // get them all is let spawn pipe the output directly to parent stdout
        stdio: [null, process.stdout, process.stderr],
      }
    );

    child.on("close", (code) => {
      if (code) {
        reject(new Error(`Failed runAppTest for app at ${dir} - fyn exit code ${code}`));
      } else {
        resolve();
      }
    });
  });
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

xrun.load("user", {
  ".lerna.check": "~$lerna run --stream check",
  bootstrap: "~$fynpo",
  test: ["bootstrap", ".lerna.check", "build-test"],
  "test-create-app": [".test-create-app"],
  "test-boilerplate": [".test-boilerplate"],
  "test-stylus-sample": [".test-stylus-sample"],
  "update-changelog": ["~$node tools/update-changelog.js"],
  "build-test": {
    desc: "Run CI test",
    task: () => {
      process.env.BUILD_TEST = "true";
      // process.env.NODE_PRESERVE_SYMLINKS = "1";
      const tasks = [
        // "test-boilerplate", // TODO: webpack 5
        "test-stylus-sample",
        ".test-jest-sample",
      ];
      let updated;
      return exec("lerna updated")
        .then((output) => {
          updated = output.stdout
            .split("\n")
            .filter((x) => x.startsWith("- "))
            .map((x) => x.substr(2));

          const updatedStr = updated.join(" ");

          if (updatedStr.indexOf("@xarc/app") >= 0) {
            tasks.push(".build-react-component", ".test-tree-shaking");
          }

          return xrun.serial(tasks);
        })
        .catch((err) => {
          if (!err.output.stderr.includes("No changed packages found")) {
            throw err;
          }
        });
    },
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
    },
  },

  ".test-tree-shaking": {
    desc: "Run tests for the demo-tree-shaking sample app",
    task: () => {
      return runAppTest(Path.join(__dirname, "samples/demo-tree-shaking"));
    },
  },

  ".test-stylus-sample": {
    desc: "Run tests for the boilerplage app stylus-sample",
    task: () => {
      return runAppTest(Path.join(__dirname, "samples/stylus-sample"));
    },
  },

  ".test-jest-sample": {
    desc: "Run tests for the boilerplage app react-jest-app",
    task: () => {
      return runAppTest(Path.join(__dirname, "samples/react-jest-app"));
    },
  },

  "samples-local": {
    desc: "modify all samples to pull electrode packages from local",
    task: () => {
      [
        "electrode-demo-index",
        "stylus-sample",
        "universal-material-ui",
        "universal-react-node",
        "react-jest-app",
      ].forEach((a) => {
        pullLocalPackages(Path.join(__dirname, "samples", a));
      });
    },
  },

  ".test-create-app": {
    async task() {
      const testDir = Path.join(__dirname, "tmp");
      await testCreateApp(testDir, "my-app");
      const testAppDir = Path.join(testDir, "my-app");
      pullLocalPackages(testAppDir);
    },
  },
});
