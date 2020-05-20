"use strict";
const Fs = require("opfs");
const Path = require("path");
const shcmd = require("shcmd");
const sortDeps = require("./sort-obj-keys");
const checkDir = require("./check-dir");
const makePkg = require("../template/_package");
const _ = require("lodash");

async function create() {
  const dirOk = await checkDir();
  if (!dirOk) {
    console.log("bye");
    return;
  }

  const srcDir = Path.join(__dirname, "../template");

  const pkg = makePkg({}, _.merge);

  sortDeps(pkg);

  Fs.writeFileSync(Path.resolve("package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
  shcmd.cp(Path.join(srcDir, "xclap.js"), process.cwd());
  // shcmd.cp("-R", Path.join(srcDir, "archetype"), process.cwd());
  shcmd.cp("-R", Path.join(srcDir, "src"), process.cwd());
  shcmd.cp("-R", Path.join(srcDir, "static"), process.cwd());
  shcmd.cp("-R", Path.join(srcDir, "_gitignore"), Path.resolve(".gitignore"));
  shcmd.cp("-R", Path.join(srcDir, "README.md"), Path.resolve("README.md"));

  console.log("created react/node webapp - please check README.md for info.");
}

module.exports = create;
