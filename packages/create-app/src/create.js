"use strict";
const Fs = require("opfs");
const Path = require("path");
const shcmd = require("shcmd");
const sortDeps = require("./sort-obj-keys");
const prompts = require("prompts");
const pkg = require("../template/_package")();

async function checkDir() {
  const existDirFiles = await Fs.readdir(process.cwd());
  if (existDirFiles.length > 0) {
    const response = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "Your directory is not empty, write to it?"
    });

    return response.overwrite;
  }

  return true;
}

async function create() {
  const dirOk = await checkDir();
  if (!dirOk) {
    console.log("bye");
    return;
  }

  const srcDir = Path.join(__dirname, "../template");

  sortDeps(pkg);

  Fs.writeFileSync(Path.resolve("package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
  shcmd.cp(Path.join(srcDir, "xclap.js"), process.cwd());
  shcmd.cp("-R", Path.join(srcDir, "archetype"), process.cwd());
  shcmd.cp("-R", Path.join(srcDir, "src"), process.cwd());
  shcmd.cp("-R", Path.join(srcDir, "static"), process.cwd());
  shcmd.cp("-R", Path.join(srcDir, "_gitignore"), Path.resolve(".gitignore"));
  shcmd.cp("-R", Path.join(srcDir, "README.md"), Path.resolve("README.md"));

  console.log("created react/node webapp - please check README.md for info.");
}

module.exports = create;
