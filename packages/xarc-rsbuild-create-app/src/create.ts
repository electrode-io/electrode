/* eslint-disable no-console */
import Fs from "opfs";
import Path from "path";
import shellcommand from "shelljs";
import _ from "lodash";
import ck from "chalker";

import { __dirname } from "./esm-utils";

import { sortDeps } from "./sort-deps";
import { checkDir } from "./check-dir";
import makePkg from "../template/_package";
import { prepareAppDir } from "./prep-app-dir";

async function create() {
  const shcmd = shellcommand;
  const appDir = await prepareAppDir();
  const dirOk = await checkDir(appDir);

  if (!dirOk) {
    console.log(`Not able to write to directory '${appDir}'. bye.`);
    return;
  }

  const srcDir = Path.join(__dirname, "../template");

  // @to-do Remove lodash.
  const pkg = makePkg({}, _.merge);

  sortDeps(pkg);

  if (!("cp" in shcmd)) {
    console.log(shcmd);
    console.log(`CP is missing.`);
    process.exit(1);
  }

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

export default create;
