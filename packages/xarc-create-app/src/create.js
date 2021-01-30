/* eslint-disable no-console */

"use strict";
const Fs = require("opfs");
const Path = require("path");
const shcmd = require("shcmd");
const sortDeps = require("./sort-obj-keys");
const checkDir = require("./check-dir");
const makePkg = require("../template/_package");
const _ = require("lodash");
const prepareAppDir = require("./prep-app-dir");
const ck = require("chalker");

async function create() {
  const appDir = await prepareAppDir();
  const dirOk = await checkDir(appDir);

  if (!dirOk) {
    console.log(`Not able to write to directory '${appDir}'. bye.`);
    return;
  }

  const srcDir = Path.join(__dirname, "../template");

  const pkg = makePkg({}, _.merge);

  sortDeps(pkg);

  Fs.writeFileSync(Path.resolve("package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
  shcmd.cp(Path.join(srcDir, "babel.config.js"), process.cwd());
  shcmd.cp(Path.join(srcDir, "xrun-tasks.ts"), process.cwd());
  shcmd.cp("-R", Path.join(srcDir, "src"), process.cwd());
  shcmd.cp("-R", Path.join(srcDir, "static"), process.cwd());
  shcmd.cp("-R", Path.join(srcDir, "_gitignore"), Path.resolve(".gitignore"));
  shcmd.cp("-R", Path.join(srcDir, "_tsconfig.json"), Path.resolve("tsconfig.json"));
  shcmd.cp("-R", Path.join(srcDir, "_browserslistrc"), Path.resolve(".browserslistrc"));
  shcmd.cp("-R", Path.join(srcDir, "README.md"), Path.resolve("README.md"));

  console.log(ck`
Created react/node webapp in directory '${appDir}'. To start development, please run:

<cyan>cd ${appDir}
npm install
npm run dev</>

For more info, please check the README.md file.

`);
}

module.exports = create;
