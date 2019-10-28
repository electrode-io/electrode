"use strict";

const assert = require("assert");
const Path = require("path");
const Fs = require("fs");
const archetype = require("./config/archetype");

assert(!archetype.noDev, "dev archetype is missing - development & build tasks not possible");

const devRequire = archetype.devRequire;

const _ = devRequire("lodash");
const xsh = devRequire("xsh");
const mkdirp = devRequire("mkdirp");
const requireAt = devRequire("require-at");
const { saveModuleVersions } = devRequire("./lib/save-module-versions");

const config = archetype.config;
const shell = xsh.$;
const exec = xsh.exec;
const mkCmd = xsh.mkCmd;

function quote(str) {
  return str.startsWith(`"`) ? str : `"${str}"`;
}

function webpackConfig(file) {
  return Path.join(config.webpack, file);
}

const showExpl = dev => {
  const { entry } = require(Path.resolve("."));
  const dllName = _.first(Object.keys(entry));
  dev = dev ? "dev." : "";
  const distName = `dist/electrode-dll.${dllName}.${dev}js`;
  return mkCmd(`~$source-map-explorer`, distName, `${distName}.map`);
};

function makeTasks() {
  const tasks = {
    build: [() => shell.rm("-rf", "dist"), "webpack-dev-build", "webpack-prod-build"],

    "dev-expl": {
      desc: "Explore moudles in dev DLL",
      task: () => showExpl(true)
    },

    "prod-expl": {
      desc: "Explore moudles in prod DLL",
      task: () => showExpl()
    },

    ".set-dev-env": () => {
      process.env.NODE_ENV = "development";
    },

    ".set-prod-env": () => {
      process.env.NODE_ENV = "production";
    },

    "webpack-dev-build": [".set-dev-env", "webpack-build", ".save-versions"],

    "webpack-prod-build": [".set-prod-env", "webpack-build", ".save-versions"],

    "webpack-build": mkCmd(
      "~$webpack",
      "--config",
      quote(webpackConfig("webpack.config.dev.js")),
      `--colors`
    ),

    ".clean-pack-tmp": () => shell.rm("-rf", ".pack-tmp"),
    ".mk-pack-tmp": () => shell.mkdir(".pack-tmp"),

    ".save-versions": saveModuleVersions,

    "npm:prepack": {
      dep: [".clean-pack-tmp", ".mk-pack-tmp"],
      task: () => {
        const pkgFile = Path.resolve("package.json");
        const pkgData = Fs.readFileSync(pkgFile);
        Fs.writeFileSync(Path.resolve(".pack-tmp/package.json"), pkgData);
        const pkg = JSON.parse(pkgData);
        pkg.dependencies = {};
        pkg.peerDependencies = {};
        pkg.devDependencies = {};
        delete pkg.fyn;
        Fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2));
      }
    },

    "npm:postpack": {
      task: [
        () => {
          const pkgData = Fs.readFileSync(Path.resolve(".pack-tmp/package.json"));
          Fs.writeFileSync(Path.resolve("package.json"), pkgData);
        },
        ".clean-pack-tmp"
      ]
    },

    //
    // expect user to upload the JS bundles in dist to a CDN server and generate
    // a JSON file with mapping from filename to the CDN URL.
    // This task will take the JSON file, and make sure filename is stripped of
    // full path prefixes and save it to a file in dist with a standard name.
    //
    "save-cdn-map": {
      desc: "Process and save a CDN mapping JSON to dist",
      task: function() {
        let jsonFname = this.argv.length > 1 && _.last(this.argv);

        if (jsonFname && jsonFname.startsWith("--")) {
          jsonFname = jsonFname.split("=")[1];
        }

        if (!jsonFname) {
          const msg = "usage: clap save-cdn-map --file=cdn-map-file.json";
          console.error(msg);
          throw new Error(msg);
        }

        const cdnMapping = JSON.parse(Fs.readFileSync(Path.resolve(jsonFname)));
        const distMapping = {};

        Object.keys(cdnMapping).forEach(fname => {
          const posixFname = fname.replace(/\\/g, "/"); // posixify path
          const parts = posixFname.split("/");
          const distFile = _.last(parts);
          Fs.accessSync(Path.resolve("dist", distFile));
          distMapping[distFile] = cdnMapping[fname];
        });

        assert(!_.isEmpty(distMapping), "No CDN mapping found for any files under dist");
        Fs.writeFileSync(
          Path.resolve("dist", "cdn-mapping.json"),
          JSON.stringify(distMapping, null, 2)
        );
      }
    }
  };

  return tasks;
}

function setupPath() {
  const nmBin = Path.join("node_modules", ".bin");
  xsh.envPath.addToFront(Path.resolve(nmBin));
  xsh.envPath.addToFront(Path.join(archetype.devDir, nmBin));
  xsh.envPath.addToFront(Path.join(__dirname, nmBin));
}

function setProductionEnv() {
  process.env.NODE_ENV = "production";
}

function setDevelopmentEnv() {
  process.env.NODE_ENV = "development";
}

module.exports = function(xclap) {
  setupPath();
  xclap = xclap || requireAt(process.cwd())("xclap") || devRequire("xclap");
  if (!process.env.hasOwnProperty("FORCE_COLOR")) {
    process.env.FORCE_COLOR = "1"; // force color for chalk
  }
  xclap.load("electrode", makeTasks());

  return xclap;
};
